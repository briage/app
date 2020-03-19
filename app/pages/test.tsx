import * as React from 'react';
import { View, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { useParams } from 'react-router-native';
import _ from 'lodash';
import Video from 'react-native-video';
import VideoPlay from 'react-native-video-controls';
import { request } from '../util';
import { Radio } from '../components/core/radio';
import { options } from '../config/meta';
import { styles } from '../style/test';
import Icon from 'react-native-vector-icons/AntDesign';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const { key, value } = action;
        const newState = _.cloneDeep(state);
        if (!_.isArray(key)) {
            newState[key] = value;
        } else {
            newState[key[0]][key[1]] = value;
        }
        return newState;
    }
    return action;
}

function Test(props) {
    const { userInfo } = props;
    const [state, dispatch] = useReducer(reducer, {
        listenMap: {},
        testpaperInfo: {},
        answerList: [],
        rightAnswerList: [],
        currentIndex: 0,
        totalGoal: 0,
        total: 0
    });
    const [testInfo, setTestInfo] = useReducer(reducer, {
        music_src: undefined,
        title: '',
        options: []
    })
    const {height} = Dimensions.get('window');
    const { testpaperId } = useParams();
    useEffect(() => {
        onFetchTestList();
    }, [])
    const onFetchTestList = async() => {
        const testpaperInfo = await onFetchTestPaper();
        const testList = [];
        let { onlyChoiceIds, multifyChoiceIds, listenIds, writeIds } = testpaperInfo;
        onlyChoiceIds = onlyChoiceIds ? onlyChoiceIds.split(/;|；/).filter(item => !!item) : [];
        multifyChoiceIds = multifyChoiceIds ? multifyChoiceIds.split(/;|；/).filter(item => !!item) : [];
        listenIds = listenIds ? listenIds.split(/;|；/).filter(item => !!item) : [];
        writeIds = writeIds ? writeIds.split(/;|；/).filter(item => !!item) : [];
        const onlyChoiceList = await Promise.all(onlyChoiceIds.map(item => onFetchProblem(item)));
        const multifyChoiceList = await Promise.all(multifyChoiceIds.map(item => onFetchProblem(item)));
        const listenList = await Promise.all(listenIds.map(item => onFetchProblem(item)));
        const writeList = await Promise.all(writeIds.map(item => onFetchProblem(item)));
        const listenChoiceList = _.flatten(await Promise.all(
                                                        listenList.map((item: {[key: string]: any}) => 
                                                                            Promise.all(item.linkProblemIds.split(/；|;/)
                                                                                            .map(d => onFetchProblem(d))))));
        testList.push(...listenChoiceList, ...onlyChoiceList, ...multifyChoiceList, ... writeList);
        const answerList = [];
        const rightAnswerList = [];
        const testMap = {};
        testList.forEach(item => {
            rightAnswerList.push(...item.answer.split(/;|；/)
                                        .filter(d => !!d).map(answer => ({problemId: item.problemId, answer, optionNum: item.options ? item.options.length : 0})));
            testMap[item.problemId] = item
            });
        listenList.forEach((item: {[key: string]: any}) => {
            testMap[item.problemId] = item
        })
        dispatch({
            testMap,
            testpaperInfo,
            answerList,
            rightAnswerList,
            currentIndex: 0,
            totalGoal: 0,
            total: rightAnswerList.length
        });
        const nextTestInfo = {
            music_src: undefined,
            title: '',
            options: []
        }
        const detailTestInfo = rightAnswerList[0] && testMap[rightAnswerList[0].problemId]
        if (detailTestInfo) {
            if (detailTestInfo.type == 5) {
                const listenInfo = testMap[detailTestInfo.linkListenId];
                nextTestInfo.music_src = listenInfo.music_src;
            }
            nextTestInfo.title = detailTestInfo.title;
            nextTestInfo.options = detailTestInfo.options;
        }
        setTestInfo(nextTestInfo);
    }
    const onFetchTestPaper = () => {
        return request('/test-paper/queryTestPaper', {testpaperId})
            .then(res => {
                if (res.success) {
                    return res.data[0]
                }
                return {}
            })
    }
    const onFetchProblem = (problemId) => {
        return request('/test-manager/queryTestList', {problemId})
            .then(res => {
                if (res.success) {
                    res.data[0].options = JSON.parse(res.data[0].options)
                    return res.data[0];
                }
                return {}
            })
    }
    const handleAnswerChange = (nextIndex, value?: any) => {
        const newState = _.cloneDeep(state);
        const { rightAnswerList, testMap, currentIndex } = newState;
        dispatch({key: ['answerList', currentIndex], value});
        if (nextIndex < newState.total) {
            const nextTestInfo = {
                music_src: undefined,
                title: '',
                options: []
            }
            const detailTestInfo = rightAnswerList[nextIndex] && testMap[rightAnswerList[nextIndex].problemId]
            if (detailTestInfo) {
                if (detailTestInfo.type == 5) {
                    const listenInfo = testMap[detailTestInfo.linkListenId];
                    nextTestInfo.music_src = listenInfo.music_src;
                }
                nextTestInfo.title = detailTestInfo.title;
                nextTestInfo.options = detailTestInfo.options;
            }
            setTestInfo(nextTestInfo);
            dispatch({key: 'currentIndex', value: nextIndex});
        }
    }
    const updateErrorBook = () => {

    }
    const handleSubmit = () => {
        let isSubmit = false;
        Alert.alert('提示', '您确定要交卷吗', [
            {text: '交卷', onPress: () => isSubmit = true},
            {text: '再检查一下', style: 'cancel'}
        ]);
        if (isSubmit) {
            const newState = _.cloneDeep(state);
            const { answerList, rightAnswerList, testMap } = newState;
            let goal = 0;
            let rightNum = 0;
            const errorBook = {
                onlyChoiceIds: '',
                multifyChoiceIds: '',
                listenIds: ''
            }
            answerList.forEach((item, index) => {
                const test = testMap[rightAnswerList[index].problemId];
                if (item === rightAnswerList[index].answer || test.type == 3) {
                    goal += test.goal;
                    rightNum ++;
                    rightAnswerList[index].result = true
                } else {
                    switch (+test.type) {
                        case 1:
                            errorBook.onlyChoiceIds += `${test.problemId};`;
                            break;
                        case 2:
                            errorBook.multifyChoiceIds += `${test.problemId};`;
                            break;
                        case 5:
                            errorBook.listenIds += `${test.linkListenId};`;
                    }
                    rightAnswerList[index].result = false
                }
            })
        }
    }
    return (
        <View style={{height}}>
            <View style={styles.headerWrapper}>
                <Icon name='left' size={20} color='#ccc' />
                <Text style={styles.headerTitle}> {state.testpaperInfo.testpaperName} </Text>
                <Text onPress={handleSubmit} style={styles.submitBtn}>交卷</Text>
            </View>
           {
                testInfo.music_src && 
                <View style={styles.listenWrapper}>
                    <VideoPlay disableFullscreen disableVolume disableBack source={{uri: testInfo.music_src}} controlTimeout={10000000000} />
                </View>
            }
            <ScrollView contentContainerStyle={styles.titleWrapper}>
                <Text style={styles.title}>
                    {testInfo.title}
                </Text>
                <View style={styles.option}>
                    {
                        testInfo.options && testInfo.options.map((item, index) => 
                        <Text>{String.fromCharCode(65 + index)}. {item} </Text>)
                    }
                </View>
            </ScrollView>
            <View style={styles.answerArea}>
                <Text style={styles.answerHeader}>答题区</Text>
                <View style={styles.selectArea}>
                    <Icon onPress={() => handleAnswerChange(state.currentIndex - 1)} name='left' size={20} />
                    <Radio 
                        options={options.slice(0, testInfo.options.length)}
                        value={state.answerList[state.currentIndex]} 
                        onChange={handleAnswerChange.bind(this, state.currentIndex + 1)} 
                    />
                    <Icon onPress={() => handleAnswerChange(state.currentIndex + 1)} name='right' size={20} />
                </View>
                
            </View>
        </View>
    )
}

export { Test };
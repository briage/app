import * as React from 'react';
import { View, ScrollView, Text, Dimensions, Alert, Modal } from 'react-native';
import { useParams, useHistory } from 'react-router-native';
import _ from 'lodash';
import VideoPlay from 'react-native-video-controls';
import { request } from '../util';
import { Radio } from '../components/core/radio';
import { options } from '../config/meta';
import { styles } from '../style/test';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'beeshell';

const { useReducer, useEffect } = React;

interface errorData {
    errorTestBookId: number,
    errorList: {
        onlyChoiceIds: string,
        multifyChoiceIds: string,
        listenIds: string
    },
    rightList?: {
        onlyChoiceIds: string,
        multifyChoiceIds: string,
        listenIds: string
    }
}

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
    const { userInfo, userInfoChange } = props;
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, {
        listenMap: {},
        testpaperInfo: {},
        answerList: [],
        rightAnswerList: [],
        currentIndex: 0,
        totalGoal: 0,
        total: 0,
        toDoCardVisible: false,
        isSubmit: false
    });
    const [testInfo, setTestInfo] = useReducer(reducer, {
        music_src: undefined,
        title: '',
        options: [],
        analysis: ''
    })
    const { height } = Dimensions.get('window');
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
            total: rightAnswerList.length,
            toDoCardVisible: false,
            isSubmit: false
        });
        const nextTestInfo = {
            music_src: undefined,
            title: '',
            options: [],
            analysis: ''
        }
        const detailTestInfo = rightAnswerList[0] && testMap[rightAnswerList[0].problemId]
        if (detailTestInfo) {
            if (detailTestInfo.type == 5) {
                const listenInfo = testMap[detailTestInfo.linkListenId];
                nextTestInfo.music_src = listenInfo && listenInfo.music_src;
            }
            nextTestInfo.title = detailTestInfo.title;
            nextTestInfo.options = detailTestInfo.options;
            nextTestInfo.analysis = detailTestInfo.analysis;
        }
        setTestInfo(nextTestInfo);
    }
    const onFetchTestPaper = () => {
        if (testpaperId.includes('errorTestBookId')) {
            let queryData = [];
            testpaperId.split('&&').forEach((item, index) => queryData[index] = item.split('=')[1]);
            console.log(queryData)
            return request('/error-book/queryErrorBookInfo', {errorTestBookId: +queryData[0]})
                .then(res => {
                    console.log(res.data)
                    if (res.success) {
                        switch (+queryData[1]) {
                            case 1:
                                return {
                                    testpaperName: '单选错题',
                                    onlyChoiceIds: res.data.onlyChoiceIds
                                };
                            case 2:
                                return {
                                    testpaperName: '多选错题',
                                    multifyChoiceIds: res.data.multifyChoiceIds
                                };
                            case 4:
                                return {
                                    testpaperName: '听力错题',
                                    listenIds: res.data.listenIds
                                }
                        }
                    }
                })
        } else {
            return request('/test-paper/queryTestPaper', {testpaperId})
            .then(res => {
                if (res.success) {
                    return res.data[0]
                }
                return {}
            })
        }
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
        value && dispatch({key: ['answerList', currentIndex], value});
        dispatch({key: 'toDoCardVisible', value: false});
        if (nextIndex < newState.total && nextIndex >= 0) {
            const nextTestInfo = {
                music_src: undefined,
                title: '',
                options: [],
                analysis: ''
            }
            const detailTestInfo = rightAnswerList[nextIndex] && testMap[rightAnswerList[nextIndex].problemId]
            if (detailTestInfo) {
                if (detailTestInfo.type == 5) {
                    const listenInfo = testMap[detailTestInfo.linkListenId];
                    nextTestInfo.music_src = listenInfo.music_src;
                }
                nextTestInfo.title = detailTestInfo.title;
                nextTestInfo.options = detailTestInfo.options;
                nextTestInfo.analysis = detailTestInfo.analysis;
            }
            setTestInfo(nextTestInfo);
            dispatch({key: 'currentIndex', value: nextIndex});
        }
    }
    const updateErrorBook = (data) => {
        return request('/error-book/updateErrorBook', data)
    }
    const record = async() => {
        const newState = _.cloneDeep(state);
        const { answerList, rightAnswerList, testMap, testpaperInfo } = newState;
        let goal = 0;
        let rightNum = 0;
        const errorBook: errorData = {
            errorTestBookId: userInfo.errorTestId,
            errorList: {
                onlyChoiceIds: '',
                multifyChoiceIds: '',
                listenIds: ''
            },
            rightList: {
                onlyChoiceIds: '',
                multifyChoiceIds: '',
                listenIds: ''
            }
        }
        answerList.forEach((item, index) => {
            const test = testMap[rightAnswerList[index].problemId];
            if (item === rightAnswerList[index].answer || test.type == 3) {
                goal += test.goal / (+test.answerNum || 1);
                rightNum ++;
                rightAnswerList[index].result = true;
                if (testpaperId.includes('errorTestBookId')) {
                    switch (+test.type) {
                        case 1:
                            errorBook.rightList.onlyChoiceIds += `${test.problemId};`;
                            break;
                        case 2:
                            errorBook.rightList.multifyChoiceIds += `${test.problemId};`;
                            break;
                        case 5:
                            errorBook.rightList.listenIds += `${test.linkListenId};`;
                    }
                }
            } else {
                switch (+test.type) {
                    case 1:
                        errorBook.errorList.onlyChoiceIds += `${test.problemId};`;
                        break;
                    case 2:
                        errorBook.errorList.multifyChoiceIds += `${test.problemId};`;
                        break;
                    case 5:
                        errorBook.errorList.listenIds += `${test.linkListenId};`;
                }
                rightAnswerList[index].result = false
            }
        })
        dispatch({key: 'isSubmit', value: true});
        dispatch({key: 'toDoCardVisible', value: true});
        dispatch({key: 'rightAnswerList', value: rightAnswerList});
        const [errBookRes, recordRes, userInfoRes] = await Promise.all([updateErrorBook(errorBook), request('/test-paper/recordData', {
            testpaperInfo: !_.isNaN(+testpaperId) && {
                testpaperId,
                studentGoal: goal
            },
            rightAnswerList
        }), handleUpdateUserInfo({
            praticeNum: rightAnswerList.length,
            rightNum,
            userId: userInfo.userId,
            phone: userInfo.phone,
            level: +testpaperInfo.isTest && Math.ceil((goal / testpaperInfo.totalGoal) * 5)
        })])
        const resData = userInfoRes.data;
            if (_.isString(resData.selfset)) {
                const selfset = {};
                console.log(resData.selfset)
                resData.selfset.split(/;|；/).forEach(item => {
                    if (!_.isNumber(+item) && item !== '') {
                        selfset[item] = true;
                    }
                });
                resData.selfset = selfset;
            }
            userInfoChange(resData);
    }
    const handleUpdateUserInfo = (data) => {
        return request('/updateUserInfo', data);
    }
    const handleSubmit = () => {
        Alert.alert('提示', '您确定要交卷吗', [
            {text: '交卷', onPress: record},
            {text: '再检查一下', style: 'cancel'}
        ]);
            
    }
    return (
        <View style={{height}}>
            <Modal
                visible={state.toDoCardVisible}
                onRequestClose={() => dispatch({key: 'toDoCardVisible', value: false})}
            >
                <View style={{...styles.headerWrapper}}>
                    <Text style={styles.headerTitle}>答题卡</Text>
                </View>
                <Radio 
                    options={state.rightAnswerList.map((item, index) => ({label: `${index + 1}`, value: index, ... (!_.isBoolean(item.result) && state.answerList[index]) ? {result: true} : _.isBoolean(item.result) ? {result: item.result} : {}}))} 
                    value={state.currentIndex} 
                    onChange={(value) => {handleAnswerChange(value)}} />
                {!state.isSubmit && <Button type='info' style={styles.modalSubmitBtn} onPress={handleSubmit}>交卷并查看结果</Button>}
            </Modal>
            <View style={styles.headerWrapper}>
                <Icon onPress={history.goBack} name='left' size={20} color='#ccc' />
                <Text style={styles.headerTitle}> {state.testpaperInfo.testpaperName} </Text>
                <Text style={styles.submitBtn} onPress={() => dispatch({key: 'toDoCardVisible', value: true})}>答题卡</Text>
                {!state.isSubmit && <Text onPress={handleSubmit} style={{...styles.submitBtn, marginLeft: 10}}>交卷</Text>}
            </View>
           {
                testInfo.music_src && 
                <View style={styles.listenWrapper}>
                    <VideoPlay disableFullscreen disableVolume disableBack source={{uri: testInfo.music_src}} controlTimeout={100000000} />
                </View>
            }
            <ScrollView contentContainerStyle={styles.titleWrapper}>
                <Text style={styles.title}>
                    {testInfo.title}
                </Text>
                <View>
                    {
                        testInfo.options && testInfo.options.map((item, index) => 
                        <Text style={styles.option}>{String.fromCharCode(65 + index)}. {item} </Text>)
                    }
                </View>
                {
                    state.isSubmit && 
                    <View>
                        <Text style={styles.option}>我的答案：{state.answerList[state.currentIndex]}</Text>
                        <Text style={styles.option}>正确答案：{state.rightAnswerList[state.currentIndex].answer}</Text>
                        <Text style={styles.option}>解析：</Text>
                        <Text style={styles.option}>{testInfo.analysis || '暂无解析'}</Text>
                    </View>
                }
            </ScrollView>
            {
                !state.isSubmit &&
                <View style={styles.answerArea}>
                    <View style={{...styles.headerWrapper, justifyContent: 'space-between'}}>
                        <Text style={styles.answerHeader}>答题区</Text>
                        <View style={{flexDirection: "row", height: 30, alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 30, color: '#618'}}>{state.currentIndex + 1}</Text>
                            <Text style={styles.option}>/{state.rightAnswerList.length}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.selectArea}>
                        <Icon onPress={() => handleAnswerChange(state.currentIndex - 1)} name='left' size={20} />
                        <View style={{width: '90%', alignItems: 'center'}}>
                            <Radio 
                                options={options.slice(0, testInfo.options.length)}
                                value={state.answerList[state.currentIndex]} 
                                onChange={handleAnswerChange.bind(this, state.currentIndex + 1)}
                            />
                        </View>
                        
                        <Icon onPress={() => handleAnswerChange(state.currentIndex + 1)} name='right' size={20} />
                    </View>
                    
                </View>
            }
        </View>
    )
}

export { Test };
import * as React from 'react';
import { ScrollView, View, FlatList, Text } from 'react-native';
import { Input, Button } from 'beeshell';
import { useHistory } from 'react-router-native';
import _ from 'lodash';
import { request } from '../util';
import { TestPaperList } from '../components/core/testPaperList';
import { styles } from '../style/search';
import Icon from 'react-native-vector-icons/AntDesign';

const { useReducer, useEffect } = React;
const color = '#38f';

interface State {
    listData: any[],
    queryData: {
        testpaperName: string,
        offset: number,
        labels: {},
        diffculty: number,
        selfset: {[key: string]: true}
    }
    total: number,
    scrollY?: any,
    rank: number,
    visible: boolean,
    originData: any[]
}

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    const { key, value } = action;
    if (key && _.isArray(key)) {
        newState[key[0]][key[1]] = value;
        return newState
    } else if (key) {
        newState[key] = value;
        return newState
    }
    return action;
}

function SearchTestPaper(props) {
    const { userInfo, goLogin } = props;
    const initalState: State = {
        listData: [],
        queryData: {
            testpaperName: '',
            offset: 0,
            labels: {},
            diffculty: 0,
            selfset: userInfo.selfset || {}
        },
        total: 0,
        rank: 0,
        visible: false,
        originData: []
    }
    useEffect(() => {
        onFetchTestPaperList(0);
    }, [])
    
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initalState);
    const onFetchTestPaperList = (offset = 0, testpaperName?: string) => {
        const queryData = _.cloneDeep(state.queryData);
        const newState = _.cloneDeep(state);
        if (testpaperName !== undefined) {
            newState.queryData.testpaperName = testpaperName;
            queryData.testpaperName = testpaperName;
            dispatch({key: ['queryData', 'testpaperName'], value: testpaperName})
        }
        queryData.offset = offset;
        queryData.selfset = {...queryData.selfset, ...queryData.labels};
        delete queryData.labels;
        request('/test-paper/queryTestPaper', queryData)
            .then(res => {
                if (res.success) {
                    if (offset > 0) {
                        newState.originData.push(...res.data);
                        newState.listData.push(...res.data);
                    } else {
                        newState.originData = res.data;
                        newState.listData = res.data;
                    }
                    newState.queryData.offset = offset;
                    newState.total = res.total;
                    dispatch(newState);
                }
            })
    }
    const handleRank = type => {
        let listData: any[] = _.cloneDeep(state.listData);
        let newState = _.cloneDeep(state)
        dispatch({key: 'rank', value: type});
        if (type && type === 1) {
            listData = listData.sort((a, b) => a.diffculty - b.diffculty);
        }
        if (type && type === 2) {
            listData = listData.sort((a, b) => b.diffculty - a.diffculty);
        }
        if (type === 0) {
            listData = newState.originData;
        }
        dispatch({key: 'listData', value: listData});
    }
    return (
        <ScrollView>
            <View style={styles.searchBar}>
                <Input style={styles.searchInput} onChange={onFetchTestPaperList.bind(this, 0)} value={state.queryData.testpaperName} placeholder='试卷名称' />
                <Button style={styles.cancleButton} type='text' onPress={history.goBack}>取消</Button>
            </View>
            <View style={styles.rankBar}>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 0)}>
                    <Icon name='setting' color={state.rank === 0 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 0 ? color : '#000'}} >综合排序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 1)}>
                    <Icon name='up' color={state.rank === 1 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 1 ? color : '#000'}} >按难度升序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 2)}>
                    <Icon name='down' color={state.rank === 2 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 2 ? color : '#000'}} >按难度降序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={() => dispatch({key: 'visible', value: true})}><Icon name='plus' /><Text style={styles.rankText} >筛选</Text></View>
            </View>
            <FlatList
                data={state.listData}
                renderItem={({item, index}) => <TestPaperList userInfo={userInfo} goLogin={goLogin} key={`search-testpaper${index}`} testPaperInfo={item} />}
            />
        </ScrollView>
    )
}

export { SearchTestPaper };
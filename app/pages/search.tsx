import * as React from 'react';
import { ScrollView, View, Text, Dimensions, Modal } from 'react-native';
import _ from 'lodash';
import { Input, Button } from 'beeshell';
import { useHistory, useParams } from 'react-router-native';
import { LongListComponent, Props } from '../components/core/longList';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../style/search';
import { LABELS } from '../config/meta';
import { MultifySelect } from '../components/core/multifySelect';

const request = require('../util').request;

const { useReducer, useEffect, useRef } = React;

interface State {
    listData: any[],
    queryData: {
        courseName: string,
        offset: number,
        labels: {},
        startMoney: number,
        endMoney: number
    }
    total: number,
    scrollY?: any,
    rank: number,
    visible: boolean,
    originData: any[],
    loading: boolean
}

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    const { key, value } = action;
    if (_.isArray(key)) {
        newState[key[0]][key[1]] = value;
    } else {
        newState[key] = value;
    }
    return newState;
}

function Search(props) {
    const initalState: State = {
        listData: [],
        queryData: {
            courseName: '',
            offset: 0,
            labels: {},
            startMoney: undefined,
            endMoney: undefined
        },
        total: 0,
        rank: 0,
        visible: false,
        originData: [],
        loading: false
    }
    const color = '#38f';
    const {height} = Dimensions.get('window');
    const { type } = useParams();
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initalState);
    useEffect(() => {
        if (type === '1') {
            onFetchCourseList(0, '', true);
        } else {
            onFetchCourseList(0);
        }
    }, [])

    const longListComponentProps: Props = {
        data: state.listData,
        total: state.total,
        onRefresh: () => {
            return onFetchCourseList(0);
        },
        onEndReached: () => {
            if (state.listData.length < state.total) {
                const newState = _.cloneDeep(state);
                onFetchCourseList(newState.queryData.offset + 1);
            }
        },
        nameKey: 'courseName',
        loading: state.loading
    }

    const onFetchCourseList = (offset, value?: string, spec?: boolean) => {
        const queryData = _.cloneDeep(state.queryData);
        queryData.offset = offset;
        if (value !== undefined) {
            dispatch({key: 'courseName', value});
            queryData.courseName = value;
        }
        if (+queryData.startMoney !== 0 && !_.isNumber(+queryData.startMoney)) {
            alert('最低价需输入数字');
            return
        }
        if (+queryData.endMoney !== 0 && !_.isNumber(+queryData.endMoney)) {
            alert('最高价需输入数字')
            return
        }
        if (spec) {
            queryData.startMoney = '0';
            queryData.endMoney = '0';
            dispatch({key: 'queryData', value: queryData})
        }
        dispatch({key: 'loading', value: true});
        return request('/course/queryCourseList', queryData)
        .then(res => {
            if (res && res.success) {
                let listData = _.cloneDeep(state.listData);
                if (offset > 0) {
                    listData.push(...res.data)
                } else {
                    listData = res.data;
                }
                dispatch({key: 'listData', value: listData});
                dispatch({key: 'originData', value: listData});
                dispatch({key: 'total', value: res.total});
                dispatch({key: 'loading', value: false})
            }
        })
    }
    const handleLableBtnClick = (item) => {
        const labels = _.cloneDeep(state.queryData.labels)
        if (labels[item]) {
            delete labels[item];
        } else {
            labels[item] = true;
        }
        dispatch({key: ['queryData', 'labels'], value: labels});
    }
    const detailSearch = () => {
        onFetchCourseList(0);
        dispatch({key: 'visible', value: false});
    }
    const handleRank = type => {
        let listData: any[] = _.cloneDeep(state.listData);
        let newState = _.cloneDeep(state)
        dispatch({key: 'rank', value: type});
        if (type && type === 1) {
            listData = listData.sort((a, b) => a.money - b.money);
        }
        if (type && type === 2) {
            listData = listData.sort((a, b) => b.money - a.money);
        }
        if (type === 0) {
            listData = newState.originData;
        }
        dispatch({key: 'listData', value: listData});
    }
    return (
        <View style={{height}}>
            <Modal
                visible={state.visible}
                onRequestClose={() => dispatch({key: 'visible', value: false})}
                animationType='slide'
            >
                <View style={styles.modalHeaderWrapper}>
                    <Text style={styles.modalBtn} onPress={() => dispatch({key: 'visible', value: false})}>关闭</Text>
                    <Text style={styles.modalBtn} onPress={detailSearch}>确认</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.title}>标签</Text>
                    <MultifySelect value={state.queryData.labels} onChange={handleLableBtnClick} options={LABELS} />
                    <Text style={styles.title}>价格区间</Text>
                    <View style={styles.moneyWrapper}>
                        <View style={styles.moneyInput}>
                            <Input onChange={(value) => dispatch({key: ['queryData', 'startMoney'], value})} value={state.queryData.startMoney} />
                        </View>
                        <Text style={styles.title}>-</Text>
                        <View style={styles.moneyInput}>
                            <Input onChange={(value) => dispatch({key: ['queryData', 'endMoney'], value})} value={state.queryData.endMoney} /> 
                        </View>
                    </View>
                    
                </View>
            </Modal>
            <View style={styles.searchBar}>
                <Input style={styles.searchInput} value={state.courseName} onChange={onFetchCourseList.bind(this, 0)} placeholder='课题名称' />
                <Button onPress={history.goBack} type='text' style={styles.cancleButton} >取消</Button>
            </View>
            <View style={styles.rankBar}>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 0)}>
                    <Icon name='setting' color={state.rank === 0 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 0 ? color : '#000'}} >综合排序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 1)}>
                    <Icon name='up' color={state.rank === 1 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 1 ? color : '#000'}} >按价格升序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={handleRank.bind(this, 2)}>
                    <Icon name='down' color={state.rank === 2 ? color : '#000'} />
                    <Text style={{...styles.rankText, color: state.rank === 2 ? color : '#000'}} >按价格降序</Text>
                </View>
                <View style={styles.rankButton} onTouchEnd={() => dispatch({key: 'visible', value: true})}><Icon name='plus' /><Text style={styles.rankText} >筛选</Text></View>
            </View>
            <LongListComponent { ...longListComponentProps } />
        </View>
    )
}

export { Search };
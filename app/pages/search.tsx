import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import _ from 'lodash';
import { Input, Button } from 'beeshell';
import { useHistory } from 'react-router-native';
import { LongListComponent, Props } from '../components/core/longList';

const request = require('../util').request;

const { useReducer, useEffect, useRef } = React;

interface State {
    listData: any[],
    total: number,
    courseName: string,
    offset: number
}

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    newState[action.key] = action.value;
    return newState;
}

function Search(props) {
    const initalState: State = {
        listData: [],
        courseName: '',
        total: 0,
        offset: 0
    }
    const history = useHistory();
    let _longList = useRef();
    useEffect(() => {
        onFetchCourseList(0);
    }, [])
    const [state, dispatch] = useReducer(reducer, initalState);
    const longListComponentProps: Props = {
        ref: c => {
            _longList = c;
        },
        data: state.listData,
        total: state.total,
        onRefresh: () => {
            dispatch({key: 'listData', value: []});
            return onFetchCourseList(0);
        },
        onEndfresh: () => {
            const offset = state.offset + 1;
            dispatch({key: 'offset', value: offset})
            return onFetchCourseList(offset);
            // _longList.flatList && _longList.flatList.scrollToIndex({index: (offset - 1) * 10});
        },
        nameKey: 'courseName'
    }
    const onFetchCourseList = (value) => {
        const offset = state.offset;
        dispatch({key: 'courseName', value})
        return request('/course/queryCourseList', {courseName: value || state.courseName, offset})
        .then(res => {
            if (res && res.success) {
                dispatch({key: 'listData', value: res.data});
                dispatch({key: 'total', value: res.total})
            }
        })
    }
    return (
        <ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Input autoFocus style={{width: '75%', height: 50}} value={state.courseName} onChange={onFetchCourseList} placeholder='课题名称' />
                <Button onPress={history.goBack} type='text' style={{margin: 0, padding: 0, backgroundColor: '#fff'}} >取消</Button>
            </View>
            <View>
                
            </View>
            <LongListComponent { ...longListComponentProps } />
        </ScrollView>
    )
}

export { Search };
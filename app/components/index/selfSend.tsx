import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { request } from '../../util';
import _ from 'lodash';
import { LongListComponent, Props as LongListProps } from '../core/longList';
import { styles } from '../../style';

interface Props {
    userInfo: {
        userId: number,
        userName: string,
        selfset: {[key: string]: true}
    }
}

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return action.value;
    } else {
        return action;
    }
}

function SelfSend(props: Props) {
    const { userInfo } = props;
    const [state, dispatch] = useReducer(reducer, {
        listData: [],
        offset: 0,
        total: 0,
        loading: false
    })
    useEffect(() => {
        onFetchCourseList(0)
    }, [])
    const onFetchCourseList = (offset) => {
        const queryData = {
            offset,
            selfset: userInfo.selfset
        }
        const newState = {
            listData: [],
            offset,
            total: 0,
            loading: true
        };
        dispatch({key: 'loading', value: true});
        return request('/course/queryCourseList', queryData)
            .then(res => {
                if (res.success) {
                    if (offset) {
                        const listData = _.cloneDeep(state.listData)
                        listData.push(...res.data);
                        newState.listData = listData;
                    } else {
                        newState.listData = res.data;
                    }
                    newState.total = res.total;
                    newState.loading = false;
                    dispatch(newState);
                }
                return res;
            })
    }
    const lognlistProps: LongListProps = {
        data: state.listData,
        total: state.total,
        nameKey: 'courseName',
        onRefresh: () => onFetchCourseList(0),
        onEndReached: () => {
            const newState = _.cloneDeep(state);
            if (state.listData.length < state.total) {
                onFetchCourseList(newState.offset + 1);
            }
        },
        loading: state.loading
    }
    return (
        <ScrollView contentContainerStyle={{backgroundColor: '#fff', marginTop: 10}}>
            <View style={styles.subTitleWrapper}>
                <Text style={styles.subTitle}>私人订制</Text>
            </View>
            <LongListComponent {...lognlistProps} />
        </ScrollView>
    )
}

export { SelfSend };
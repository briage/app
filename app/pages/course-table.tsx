import * as React from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { styles } from '../style/course-table';
import _ from 'lodash';
import { ColCourseItem } from '../components/core/courseItem';
import { request } from '../util';
import { Longlist } from 'beeshell';
import { LongListComponent } from '../components/core/longList';

const { useEffect, useReducer } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
    
}

function CourseTable(props) {
    const {userInfo} = props;
    const [state, dispatch] = useReducer(reducer, {
        freeList: [],
        customList: []
    });
    useEffect(() => {
        fetchCourseInfoList();
    }, [])
    const fetchCourseInfoList = async () => {
        const courseIds = userInfo && userInfo.courseIds;
        if (courseIds) {
            const courseList = [...new Set(courseIds.split(/;|；/))].filter(item => !!item);
            const courseInfoList = (await Promise.all(courseList.map(item => onFetchCourseInfo(item))) as any[]);
            const freeList = [], customList = [];
            courseInfoList.forEach(item => {
                if (item.money && item.money > 0) {
                    customList.push(item);
                } else {
                    freeList.push(item);
                }
            })
            dispatch({
                freeList,
                customList
            })
        }
    }
    const onFetchCourseInfo = (courseId) => {
        return request('/course/queryCourseList', {courseId})
            .then(res => {
                if (res.success) {
                    return res.data[0];
                }
                return {};
            })
    } 
    const renderItem = ({item, index}) => <ColCourseItem key={index} title={item.courseName} money={item.money} uri={item.image_src} link={`/course/${item.courseId}`} />;
    return (
        <ScrollView>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerTitle} >课程表</Text>
            </View>
            <Text style={styles.subTitle}>付费课</Text>
            {
                state.customList.length ?
                <FlatList
                    horizontal
                    style={styles.flatList}
                    data={state.customList}
                    renderItem={renderItem}
                />
                :
                <Text style={styles.tipWrapper}>您还没有购买任何付费课程</Text>
            }
            
            <Text style={styles.subTitle}>免费课</Text>
            {
                state.freeList.length ?
                <LongListComponent
                    data={state.freeList}
                    total={state.freeList.length}
                    nameKey='courseName'
                />
                :
                <Text style={styles.tipWrapper}>您还没有报名任何免费课程</Text>
            }
            
        </ScrollView>
    )
}

export { CourseTable };
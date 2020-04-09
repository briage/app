import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Link } from 'react-router-native';
import { request } from '../../util';
import { ColCourseItem } from '../core/courseItem';
import { styles } from '../../style';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    return action;
}

function FreeList(props) {
    const queryData = {
        hot: true,
        money: 0
    }
    const [listData, dispatch] = useReducer(reducer, []);
    const onFetchCourseList = () => {
        request('/course/queryCourseList', queryData)
            .then(res => {
                if (res.success) {
                    dispatch(res.data.slice(0, 6));
                }
            })
    }
    useEffect(() => {
        onFetchCourseList();
    }, [])
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.subTitleWrapper}>
                <Text style={styles.subTitle}>热门公开课</Text>
                <Link to='/search/1'><Text style={styles.subTitleMore}>全部</Text></Link>
            </View>
            <ScrollView contentContainerStyle={styles.freeListWrapper}>
                {
                    listData.map((item, index) => 
                    <ColCourseItem 
                        key={`course${index}`}
                        uri={item.image_src} 
                        money={item.money} 
                        usedNum={item.studentIds ? item.studentIds.split(/;|；/).length : 0} 
                        title={item.courseName}
                        link={`/course/${item.courseId}`}
                        width={160}
                    />)
                }
            </ScrollView>
        </ScrollView>
        
    )
}

export { FreeList };
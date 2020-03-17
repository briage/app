import * as React from 'react';
import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import { styles } from '../style/myInfo';
import { request } from '../util';
import { ColCourseItem } from '../components/core/courseItem';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import { Rank } from '../components/myInfo/rank';

export interface UserInfo {
    userId: number,
    userName: string,
    sex: number,
    selfset:{[key: string]: true},
    courseIds: string,
    phone: string,
    type: number,
    restMoney: number,
    achievementRate: number,
    recentStudy: string,
    praticeNum: number,
    errorTestId: number,
    avatar: string,
    level: number,
    studyTime: number
}

interface Props {
    userInfo: UserInfo,
    goLogin: (isUpdate?: boolean) => void
}

const { useReducer, useEffect } = React;

function reducer(state, action) {
    return action;
}

function MyInfo(props: Props) {
    const { goLogin, userInfo } = props;
    const [listData, dispatch] = useReducer(reducer, []);
    const [rankVisible, setrankVisible] = useReducer(reducer, false);
    const [errBookVisible, seterrBookVisible] = useReducer(reducer, false);
    const [settingVisible, setsettingVisible] = useReducer(reducer, false);
    const handleLogin = () => {
        if (userInfo.userId) {
            goLogin(true)
        } else {
            goLogin(false)
        }
    }
    useEffect(() => {
        onFetchCourseList();
    }, [])
    const onFetchCourseList = async() => {
        const courseIds = [...new Set(userInfo.recentStudy && userInfo.recentStudy.split(/;|；/))].filter(item => !!item && _.isNumber(+item));
        console.log(courseIds)
        const queryArr = courseIds.map(item => 
            request('/course/queryCourseList', {courseId: item})
                .then(res => {
                    if (res.success) {
                        return res.data[0]
                    }
                })
        )
        const courseList = await Promise.all(queryArr);
        const RealCourseList = courseList.filter(item => !!item);
        dispatch(RealCourseList);
    }
    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Rank visible={rankVisible} onClose={() => setrankVisible(false)} userInfo={userInfo} />
            <View style={styles.header}>
                {
                 userInfo.avatar ? <Image style={styles.avatar} source={{uri: userInfo.avatar}} /> :
                <Image style={styles.avatar} source={require('../static/user.jpeg')} />
                }
                <Text onPress={handleLogin} style={styles.headerTitle}> {userInfo.userName || '请登录'} </Text>
            </View>
            <View style={styles.recentListWrapper}>
                <Text style={styles.title}>最近看过</Text>
                <FlatList
                    data={listData.slice(0, 10)}
                    horizontal
                    initialNumToRender={3}
                    renderItem = {({item}) => (
                        <View style={{margin: 5, width: 150, height: 120}}>
                            <ColCourseItem uri={item.image_src} link={`/course/${item.courseId}`} title={item.courseName} />
                        </View>
                    )}
                    ListEmptyComponent={<Text>{userInfo.userId ? '您还未浏览任何课程' : '登录后才享受记录哦'}</Text>}
                />
            </View>
            <View style={styles.navWrapper}>
                <View style={styles.navRow}>
                    <Text style={styles.title}>余额</Text><Text>{`¥${userInfo.restMoney || 0}`}</Text>
                </View>
                <View style={styles.navRow} onTouchEnd={() => setrankVisible(true)}>
                    <Text style={styles.title}>排行榜</Text><Icon name='right' size={20} color='#ccc' />
                </View>
                <View style={styles.navRow}>
                    <Text style={styles.title}>错题本</Text><Icon name='right' size={20} color='#ccc' />
                </View>
            </View>
            <View style={styles.navWrapper}>
                <View style={styles.navRow}>
                    <Text style={styles.title}>意见反馈</Text><Icon name='right' size={20} color='#ccc' />
                </View>
                <View style={styles.navRow}>
                    <Text style={styles.title}>设置</Text><Icon name='right' size={20} color='#ccc' />
                </View>
            </View>
        </ScrollView>
    )
}

export { MyInfo };
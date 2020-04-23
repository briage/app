import * as React from 'react';
import { ScrollView, Text, View, BackHandler, Dimensions, StatusBar, FlatList, Image, Alert } from 'react-native';
import { useParams, useHistory } from 'react-router-native';
import { request } from '../util';
import { Button } from 'beeshell';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import _ from 'lodash';
import { styles } from '../style/course';
import Icon from 'react-native-vector-icons/FontAwesome';

const { useEffect, useReducer, useState } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function Course(props) {
    const { userInfo, goLogin, userInfoChange } = props;
    const { courseId } = useParams();
    const history = useHistory();
    const {width, height} = Dimensions.get('window');
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        courseInfo: {},
        subCourseInfoList: [],
        teacherInfoList: [],
        currentSubCourseInfo: {},
        fullscreen: false,
        navBarHidden: false,
        isList: false 
    })
    useEffect(() => {
        addRencentRecord();
        onFetchCourseInfo();
    }, [])
    const addRencentRecord = () => {
        if (userInfo.userId) {
            const data = {
                userId: userInfo.userId,
                courseId
            }
            request('/recentRecord', data)
                .then(res => {
                    if (res.success) {
                        userInfoChange(res.data);
                    }
                })
        }
    }
    const onFetchCourseInfo = async () => {
        request('/course/queryCourseList', {courseId})    
            .then( async res => {
                if (res.success) {
                    const resData = res.data[0];
                    if (resData.studentIds) {
                        resData.usedNum = resData && resData.studentIds.split(/;|；/).length;
                    }
                    const newState = {
                        loading: false,
                        courseInfo: resData,
                        subCourseInfoList: [],
                        currentSubCourseInfo: {
                            video_src: ''
                        },
                        teacherInfoList: []
                    }
                    const subcourseIds = resData.subcourseIds && resData.subcourseIds.split(/;|；/).filter(item => !!item);
                    const teacherIds = resData.teacherIds && resData.teacherIds.split(/;|；/).filter(item => !!item);
                    if (_.isArray(subcourseIds)) {
                        const subCourseInfoList = (await Promise.all(subcourseIds.map(item => onFetchSubCourseInfo(item))) as any[]);
                        newState.subCourseInfoList = subCourseInfoList;
                        if (userInfo && userInfo.courseIds && userInfo.courseIds.indexOf(`${courseId}`) !== -1) {
                            newState.currentSubCourseInfo = subCourseInfoList[0] || {};
                        }
                    }
                    if (_.isArray(teacherIds)) {
                        const teacherInfoList = (await Promise.all(teacherIds.map(item => onFetchUserInfo(item))) as any[]);
                        newState.teacherInfoList = teacherInfoList;
                    }
                    dispatch(newState);
                }
            })
    }
    const onFetchUserInfo = (userId) => {
        return request('/getUserInfo', { userId })
            .then(res => {
                if (res.success) {
                    return res.data[0]
                }
                return {}
            })
    }
    const onFetchSubCourseInfo = (subcourseId) => {
        return request('/node-manage/queryNodeList', {subcourseId})
            .then(res => {
                if (res.success) {
                    return res.data[0];
                }
                return {}
            })
    }
    const handleFullScreen = () => {
        Orientation.lockToLandscape();
        dispatch({key: 'fullscreen', value: true})
    }
    const handleExitFullScreen = () => {
        Orientation.lockToPortrait();
        dispatch({key: 'fullscreen', value: false})
    }
    const recordStudyTime = () => {
        userInfo.studyTime = userInfo.studyTime ? userInfo.studyTime + 1 : 1;
        request('/updateUserInfo', {userId: userInfo.userId, studyTime: userInfo.studyTime})
    }
    const joinCourse = () => {
        if (userInfo && userInfo.userId){
            if (!state.courseInfo.money || (userInfo.restMoney && userInfo.restMoney - state.courseInfo.money >= 0)) {
                request('/joinCourse', {userId: userInfo.userId, courseId,})
                .then(res => {
                    if (res.success) {
                        Alert.alert('报名成功');
                        userInfoChange(res.data);
                    }
                })
            } else {
                Alert.alert('余额不足，请充值')
            }
            
        } else {
            Alert.alert('温馨提示', '需要登录后才可以报名哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        }
    }
    const handleListItem = (item) => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以享受该功能哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            if (userInfo.courseIds.indexOf(`${courseId}`) === -1) {
                Alert.alert('请先报名');
                dispatch({key: 'isList', value: false});
            } else {
                dispatch({key: 'currentSubCourseInfo', value: item})
            }
        }
    }
    return(
        <ScrollView>
            <StatusBar hidden={state.fullscreen} />
            <Text style={styles.subCourseTitle}>{`${state.currentSubCourseInfo.index || ''} ${state.currentSubCourseInfo.subcourseName || ''}`}</Text>
            {
                state.currentSubCourseInfo.video_src ? 
                <VideoPlayer 
                    source={{uri: state.currentSubCourseInfo.video_src}}
                    onBack={history.goBack}
                    navigator={ props.navigator }
                    style={{...styles.videoWrapper, ...state.fullscreen && {height: height < width ? height : width}}} 
                    onEnterFullscreen={handleFullScreen}
                    onExitFullscreen={handleExitFullScreen}
                    onEnd={recordStudyTime}
                />
                :
                <View style={{...styles.videoWrapper, backgroundColor: '#000'}}></View>
            }
            
            {
            !state.fullscreen && [
            <View style={styles.navBarWrapper}>
                <Text onPress={() => dispatch({key: 'isList', value: false})} style={{...styles.navBar, ...!state.isList && styles.actionNavBar}}> 课程详情 </Text>
                <Text onPress={() => dispatch({key: 'isList', value: true})} style={{...styles.navBar, ...state.isList && styles.actionNavBar}}> 目录 </Text>
            </View>,
            <View>
                {
                    !state.isList ?
                    <View style={{...styles.detailWrapper, height: height - 300}}>
                        <ScrollView>
                            <Text style={styles.courseTitle} > {state.courseInfo.courseName} </Text>
                            <View style={{...styles.navBarWrapper, ...styles.bottonBorder}}>
                                <Text style={styles.money}> {state.courseInfo.money ? `¥${state.courseInfo.money}` : '免费'} </Text>
                                <Text style={styles.tip}> {`报名人数 ${state.courseInfo.usedNum || 0}`} </Text>
                            </View>
                            <Text style={styles.courseTitle}> 老师介绍 </Text>
                            <View style={{...styles.navBarWrapper, ...styles.bottonBorder}}>
                                <FlatList 
                                    data={state.teacherInfoList}
                                    renderItem={({item, index}) => (
                                        <View style={styles.navBarWrapper}>
                                            <Image style={styles.teacherAvatar} source={{uri: item.avatar}} />
                                            <View>
                                                <Text style={styles.teacherName}> {item.userName} </Text>
                                                <Text style={styles.tip}> {item.introduce} </Text>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                            <Text style={styles.courseTitle}>课程简介</Text>
                            <Text style={styles.teacherName}>
                                {state.courseInfo.introduceInfo}
                            </Text>
                        </ScrollView>
                        <View style={{zIndex: 1000, position: 'relative', bottom: 0}}>
                            {
                                userInfo && userInfo.courseIds && userInfo.courseIds.indexOf(`${courseId}`) !== -1 ? 
                                <Button style={styles.joinBtn} disabled type='info'>已报名</Button>
                                :
                                <Button style={styles.joinBtn} onPress={joinCourse} type='info' >报名课程</Button>
                            }
                        </View>
                    </View>
                    :
                    <FlatList 
                        data={state.subCourseInfoList}
                        renderItem={({item}) => (
                            <View style={styles.subCourseItemWrapper} onTouchEnd={handleListItem.bind(this, item)} key={item.index}>
                                <Text style={styles.teacherName}> 第{item.index}节 </Text>
                                <Text style={styles.teacherName}> <Icon name='play-circle' size={20} /> {item.subcourseName} </Text>
                            </View>
                        )}
                    />
                }
            </View>]
            }
        </ScrollView>
    )
}

export {Course};
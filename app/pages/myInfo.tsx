import * as React from 'react';
import {View, Text, Image, ScrollView, FlatList, Alert} from 'react-native';
import { styles } from '../style/myInfo';
import { request } from '../util';
import { ColCourseItem } from '../components/core/courseItem';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Rank } from '../components/myInfo/rank';
import { Setting } from '../components/myInfo/setting';
import { ErrorBook } from '../components/myInfo/errbook';
import {useHistory} from 'react-router-native';
import { MissionCenter } from '../components/myInfo/missionCenter';
import { VIP_LEVEL } from '../config/meta';
import { PubCard } from '../components/card/pubCard';

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
    studyTime: number,
    customMoney: number
}

interface Props {
    userInfo: UserInfo,
    goLogin: (isUpdate?: boolean) => void,
    userInfoChange: (value: any) => void
}

const { useReducer, useEffect } = React;

function reducer(state, action) {
    return action;
}

function MyInfo(props: Props) {
    const { goLogin, userInfo, userInfoChange } = props;
    const [listData, dispatch] = useReducer(reducer, []);
    const [rankVisible, setrankVisible] = useReducer(reducer, false);
    const [errBookVisible, seterrBookVisible] = useReducer(reducer, false);
    const [settingVisible, setsettingVisible] = useReducer(reducer, false);
    const [missionVisible, setmissionVisible] = useReducer(reducer, false);
    const [cardVisible, setCardVisible] = useReducer(reducer, false);
    const [vipLevel, setvipLevel] = useReducer(reducer, '倔强青铜 V0');
    const history = useHistory();
    const handleLogin = () => {
        if (userInfo.userId) {
            goLogin(true)
        } else {
            goLogin(false)
        }
    }
    useEffect(() => {
        onFetchCourseList();
        for (let item in VIP_LEVEL) {
            if (userInfo.customMoney >= VIP_LEVEL[item][0] && userInfo.customMoney <= VIP_LEVEL[item][1]) {
                setvipLevel(item);
                break;
            }
        }
    }, [])
    const onFetchCourseList = async() => {
        const courseIds = [...new Set(userInfo.recentStudy && userInfo.recentStudy.split(/;|；/))].filter(item => !!item && _.isNumber(+item));
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
    const doCard = () => {
        if (userInfo.userId) {
            setCardVisible(true)
        } else {
            Alert.alert('温馨提示', '需要登录后才可以打卡哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Rank visible={rankVisible} onClose={() => setrankVisible(false)} userInfo={userInfo} />
            <Setting visible={settingVisible} onClose={() => setsettingVisible(false)} goLogin={goLogin} userInfo={userInfo} userInfoChange={userInfoChange} />
            <ErrorBook visible={errBookVisible} onClose={() => seterrBookVisible(false)} userInfo={userInfo} goLogin={goLogin} />
            <MissionCenter visible={missionVisible} onClose={() => setmissionVisible(false)} userInfo={userInfo} />
            <PubCard visible={cardVisible} userInfo={userInfo} onClose={() => setCardVisible(false)} />
            <View style={styles.header}>
                <View style={styles.footerNameBar}>
                    {
                        userInfo.avatar ? <Image style={styles.avatar} source={{uri: userInfo.avatar}} /> :
                        <Image style={styles.avatar} source={require('../static/user.jpeg')} />
                    }
                    <View>
                        <Text onPress={handleLogin} style={styles.headerTitle}> {userInfo.userName || '请登录'} </Text>
                        <View style={styles.vipWrapper}>
                            <Text style={styles.vipText}>{vipLevel}</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.footerNameBar}>
                    <AntIcon name='checksquareo' size={25} onPress={doCard} style={{marginRight: 20}} />
                    <Icon name='bell' color='#000' size={25} onPress={() => setmissionVisible(true)} />
                </View>
                
            </View>
            <View style={styles.recentListWrapper}>
                <Text style={{...styles.title, paddingBottom: 5}}>最近看过</Text>
                <FlatList
                    data={listData.slice(0, 10)}
                    horizontal
                    initialNumToRender={3}
                    renderItem = {({item}) => (
                        <View style={{width: 140, height: 120, overflow: 'hidden'}}>
                            <ColCourseItem uri={item.image_src} link={`/course/${item.courseId}`} title={item.courseName} width={120} height={70} />
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
                    <Text style={styles.title}>排行榜</Text><Icon name='angle-right' size={25} color='#ccc' />
                </View>
                <View style={styles.navRow} onTouchEnd={() => seterrBookVisible(true)}>
                    <Text style={styles.title}>错题本</Text><Icon name='angle-right' size={25} color='#ccc' />
                </View>
                <View style={styles.navRow} onTouchEnd={() => history.push('/card')}>
                    <Text style={styles.title}>动态广场</Text><Icon name='angle-right' size={25} color='#ccc' />
                </View>
            </View>
            <View style={styles.navWrapper}>
                <View style={styles.navRow} onTouchEnd={() => history.push('/newpage')}>
                    <Text style={styles.title}>在线直播</Text><Icon name='angle-right' size={25} color='#ccc' />
                </View>
                <View style={styles.navRow} onTouchEnd={() => setsettingVisible(true)}>
                    <Text style={styles.title}>设置</Text><Icon name='angle-right' size={25} color='#ccc' />
                </View>
            </View>
        </ScrollView>
    )
}

export { MyInfo };
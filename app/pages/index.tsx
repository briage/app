import * as React from 'react';
import { ScrollView, View, Text, AsyncStorage } from 'react-native';
import { AdSwiper } from '../components/index/ad-swiper';
import { SearchBar } from '../components/index/search';
import { Button } from 'beeshell';
import { styles } from '../style';
import { FreeList } from '../components/index/freeList';

const { useReducer } = React;

function reducer(state, action) {
    return action;
}

function Index(props) {
    const [userInfo, dispatch] = useReducer(reducer, {});
    setTimeout(async () => {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString && !userInfo.userId) {
            dispatch(JSON.parse(userInfoString));
        }
    }, 500);
    return (
        <ScrollView>
            <SearchBar />
            <AdSwiper />
            <View style={styles.careerWrapper}>
                <View style={styles.dataShowHeader}>
                    <Text style={styles.dataShowHeaderFont}>我 的 生 涯</Text>
                </View>
                <View style={styles.dataShowItem}>
                    <Text>{+userInfo.praticeNum || 0}</Text>
                    <Text style={styles.tip}>刷题总数/道</Text>
                </View>
                <View style={styles.dataShowItem}>
                    <Text>{+userInfo.studyTime || 0}</Text>
                    <Text style={styles.tip}>上课总数/节</Text>
                </View>
                <View style={styles.dataShowItem}>
                    <Text>{+userInfo.achievementRate || 0}</Text>
                    <Text style={styles.tip}>刷题正确率</Text>
                </View>
            </View>
            <FreeList />
            <Button onPress={props.goLogin.bind(this, false)}>登录</Button>
            <Button onPress={props.goLogin.bind(this, true)}>userInfo</Button>
        </ScrollView>
    )
}

export { Index };
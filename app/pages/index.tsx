import * as React from 'react';
import { ScrollView, View, Text, AsyncStorage } from 'react-native';
import { AdSwiper } from '../components/index/ad-swiper';
import { SearchBar } from '../components/index/search';
import Orientation from 'react-native-orientation';
import { styles } from '../style';
import { FreeList } from '../components/index/freeList';
import { SelfSend } from '../components/index/selfSend';

function Index(props) {
    const { goLogin } = props;
    const userInfo = props.userInfo || {}
    Orientation.lockToPortrait();
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
            <SelfSend userInfo={userInfo} />
        </ScrollView>
    )
}

export { Index };
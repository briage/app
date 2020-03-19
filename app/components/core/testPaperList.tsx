import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { diffculty } from '../../config/meta';
import { styles } from '../../style/testPaperItem';

interface Props {
    testPaperInfo: {[key: string]: any},
    userInfo: {[key: string]: any},
    goLogin: (isUpdate?: boolean) => void
}

function TestPaperList(props: Props) {
    const { testPaperInfo, userInfo, goLogin } = props;
    const history = useHistory();
    const handleTouch = () => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以做题哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            history.push(`/test/${testPaperInfo.testpaperId}`)
        }
    }
    return (
        <View onTouchEnd={handleTouch} key={`testpaper${testPaperInfo.testpaperId}`} style={styles.row}>
            <Text style={styles.title}> {testPaperInfo.testpaperName} </Text>
            <Text style={styles.tip}> 使用人数 {testPaperInfo.usedCount} </Text>
            <View style={styles.diffcultyRow}>
                <Text style={styles.tip}>难度</Text>
                <Text style={styles.star}> {diffculty[testPaperInfo.diffculty]} </Text>
            </View>
        </View>
    )
}

export { TestPaperList };
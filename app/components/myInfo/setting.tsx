import * as React from 'react';
import { View, Text, Modal, AsyncStorage } from 'react-native';
import { styles } from '../../style/myInfo';
import { SEX, diffculty } from '../../config/meta';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'beeshell';

function Setting(props) {
    const { userInfo, goLogin, visible, onClose, userInfoChange } = props;
    const exitLogin = async() => {
        await AsyncStorage.setItem('userInfo', JSON.stringify({}));
        userInfoChange({});
        onClose()
    }
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={{...styles.header, justifyContent: 'flex-start'}}>
                <Icon onPress={onClose} name='left' size={25} color='#aaa' />
                <Text style={{...styles.modalHeaderTitle, paddingLeft: 100}}>基本信息</Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>ID</Text>
                <Text style={styles.title}> {userInfo.userId || ''} </Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>昵称</Text>
                <Text style={styles.title}> {userInfo.userName || ''} </Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>性别</Text>
                <Text style={styles.title}> {['男', '女'][userInfo.sex] || ''} </Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>绑定手机</Text>
                <Text style={styles.title}> {userInfo.phone || ''} </Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>水平</Text>
                <Text style={styles.title}> {diffculty[userInfo.level] || '未评测'} </Text>
            </View>
            <View style={styles.modalNavRow}>
                <Text style={styles.title}>已消费</Text>
                <Text style={styles.title}> {userInfo.customMoney || 0} </Text>
            </View>
            {
                userInfo.userId ?
                <Button onPress={exitLogin} type='danger'>退出登录</Button>
                :
                <Button onPress={() => goLogin(false)} type='info'>登录</Button>
            }
        </Modal>
    )
}

export { Setting };
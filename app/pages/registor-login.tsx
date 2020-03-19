import * as React from 'react';
import { View, Text, Modal, AsyncStorage, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import { InputForm } from '../components/core/input';
import { styles } from '../style/login';
import { Button, Input } from 'beeshell';
import { Radio } from '../components/core/radio';
import { SEX, LABELS } from '../config/meta';
import { MultifySelect } from '../components/core/multifySelect';
import { request } from '../util';
import { Upload } from '../components/core/upload';

interface UserInfo {
    phone: string,
    password: string,
    userName,
    selfset: {[key: string]:true},
    sex: number,
    avatar: string,
    type: number,
    userId?: number,
}
interface Props {
    visible: boolean,
    onClose: () => void,
    goLogin: (isUpdate?: boolean) => void,
    isUpdate?: boolean,
    userInfoChange: (value) => any,
    userInfo: UserInfo
}

const { useState, useEffect } = React;

function RegistorLogin(props: Props) {
    const { visible, onClose, goLogin, isUpdate, userInfoChange, userInfo } = props;
    const [user, setUser] = useState(userInfo);
    const handleShow = () => {
        setUser(userInfo);
        console.log(userInfo)
    }
    const handleLogin = () => {
        const newState = _.cloneDeep(user);
        request('/login', newState)
            .then(res => {
                if (res.success) {
                    if (res.status === 1) {
                        onClose();
                    } else {
                        goLogin(true);
                    }
                    const resData = res.data;
                    if (_.isString(resData.selfset)) {
                        const selfset = {};
                        resData.selfset.split(/;|；/).forEach(item => {
                            selfset[item] = true;
                        });
                        resData.selfset = selfset;
                    }
                    userInfoChange(resData)
                }
            })
    }
    const handleUpdateInfo = async () => {
        if (!userInfo.userId) {
            Alert.alert('请重新登录');
            goLogin(false);
            return;
        }
        const res = await request('/updateUserInfo', user);
        if (res.success) {
            onClose();
            const resData = res.data;
            if (_.isString(resData.selfset)) {
                const selfset = {};
                resData.selfset.split(/;|；/).forEach(item => {
                    if (!_.isNumber(+item) && item !== '') {
                        selfset[item] = true;
                    }
                });
                resData.selfset = selfset;
            }
            userInfoChange(resData);
        }
    }
    const handleChange = (key, value) => {
        const newUserInfo = _.cloneDeep(user);
        if (key === 'selfset') {
            let selfset = _.cloneDeep(newUserInfo.selfset);
            if (!selfset) {
                selfset = {};
            }
            if (selfset[value]) {
                delete selfset[value];
            } else {
                selfset[value] = true;
            }
            newUserInfo.selfset = selfset;
        } else {
            newUserInfo[key] = value
        }
        setUser(newUserInfo)
    }
    const handleImagePicker = (uri) => {
        const newUserInfo = _.cloneDeep(user);
        newUserInfo.avatar = uri;
        setUser(newUserInfo);
    }
    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={onClose}
            onShow={handleShow}
        >
            {
                isUpdate ?
                [
                    <View key='info-header' style={styles.headerBar}>
                        <View>
                            <Text key='info-title' style={styles.title}>完善信息</Text>
                        </View>
                        <View>
                            <Text key='achevie' style={styles.achevie} onPress={handleUpdateInfo}>完成</Text>
                        </View>
                    </View>,
                    <View key='content' style={styles.contentWrapper}>
                        <Upload onSubmit={handleImagePicker} type='photo' avatar={user.avatar} />
                        <InputForm type='text' key='userName' value={user.userName} onChange={handleChange.bind(this, 'userName')} placeholder='昵称' />
                        <Radio key='sex' value={user.sex} onChange={handleChange.bind(this, 'sex')} options={SEX} />
                        <View style={styles.subTitleWrapper}>
                            <Text style={styles.subTitle}>私人订制</Text><Text style={styles.tip}>有利于精准推送你所需要的课程</Text>
                        </View>
                        <MultifySelect key='selfset' value={user.selfset || {}} onChange={handleChange.bind(this, 'selfset')} options={LABELS} />
                    </View>
                ]
                :
                [
                    <View key='login-header' style={styles.headerBar}>
                        <View key='back' style={styles.back} onTouchEnd={onClose} ><Icon name='left' style={{fontSize: 20}} color='#ccc' /></View>
                        <View key='title-wrapper' style={styles.titleWrapper}>
                            <Text key='title' style={styles.title}>登录/注册</Text>
                        </View>
                    </View>,
                    <View key='content-wrapper' style={styles.contentWrapper}>
                        <Text key='tip' style={styles.tip}>未注册的手机号将自动注册</Text>
                        <InputForm type='text' key='phone' maxLength={11} value={user.phone} onChange={handleChange.bind(this, 'phone')} placeholder='手机号' />
                        <InputForm type='text' key='password' value={user.password} onChange={handleChange.bind(this, 'password')} placeholder='密码' />
                        <Button style={styles.loginBtn} onPress={handleLogin} type='info'>登录/注册</Button>
                    </View>
                ]
            }
            
        </Modal>
    )
}

export { RegistorLogin };
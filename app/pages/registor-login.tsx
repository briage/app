import * as React from 'react';
import { View, Text, Modal, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import { InputForm } from '../components/core/input';
import { styles } from '../style/login';
import { Button, Input } from 'beeshell';
import { Radio } from '../components/core/radio';
import { SEX, LABELS } from '../config/meta';
import { MultifySelect } from '../components/core/multifySelect';
import { request } from '../util';

const { useReducer, useEffect } = React;

interface State {
    phone: number,
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
    isUpdate?: boolean
}

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    } else {
        return action;
    }
    
}

const initalState: State = {
    phone: undefined,
    password: '',
    userName: '',
    selfset: {},
    sex: 0,
    avatar: '',
    type: 1,
}

function RegistorLogin(props: Props) {
    const [state, dispatch] = useReducer(reducer, initalState)
    const { visible, onClose, goLogin, isUpdate } = props;
    if (isUpdate && !state.userId) {
        AsyncStorage.getItem('userInfo').then(res => {
            if (res) {
                const userInfo = JSON.parse(res);
                userInfo.selfset = userInfo.selfset || {};
                dispatch(userInfo);
            }
        })
    } 
    
    const handleLogin = () => {
        const newState = _.cloneDeep(state);
        request('/login', newState)
            .then(res => {
                if (res.success) {
                    if (res.status === 1) {
                        onClose();
                    } else {
                        goLogin(true);
                    }
                    AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
                }
            })
    }
    const handleUpdateInfo = async () => {
        if (!state.userId) {
            Alert.alert('请重新登录');
            goLogin(false);
            return;
        }
        const res = await request('/updateUserInfo', state);
        if (res.success) {
            onClose();
            AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        }
    }
    const handleChange = (key, value) => {
        console.log(value)
        if (key === 'selfset') {
            const selfset = _.cloneDeep(state.selfset);
            console.log(selfset)
            if (selfset[value]) {
                delete selfset[value];
            } else {
                selfset[value] = true;
            }
            value = selfset;
        }
        dispatch({key, value});
    }
    return (
        <Modal
            visible={visible}
            animationType='slide'
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
                        <InputForm type='text' key='userName' value={state.userName} onChange={handleChange.bind(this, 'userName')} placeholder='昵称' />
                        <Radio key='sex' value={state.sex} onChange={handleChange.bind(this, 'sex')} options={SEX} />
                        <View style={styles.subTitleWrapper}>
                            <Text style={styles.subTitle}>私人订制</Text><Text style={styles.tip}>有利于精准推送你所需要的课程</Text>
                        </View>
                        <MultifySelect key='selfset' value={state.selfset} onChange={handleChange.bind(this, 'selfset')} options={LABELS} />
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
                        <InputForm type='text' key='phone' maxLength={11} value={state.phone} onChange={handleChange.bind(this, 'phone')} placeholder='手机号' />
                        <InputForm type='text' autoComplete='password' key='password' value={state.password} onChange={handleChange.bind(this, 'password')} placeholder='密码' />
                        <Button style={styles.loginBtn} onPress={handleLogin} type='info'>登录/注册</Button>
                    </View>
                ]
            }
            
        </Modal>
    )
}

export { RegistorLogin };
import * as React from 'react';
import { View, TextInput, Image, Text, Modal, Alert } from 'react-native';
import moment from 'moment';
import { styles } from '../../style/cardItem';
import { Upload } from '../core/upload';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import { request } from '../../util';
import { useHistory, useLocation } from 'react-router-native';

const { useReducer } = React;

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    if (action.key) {
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function PubCard(props) {
    const { userInfo, visible, onClose, onFetchCardList } = props;
    const initalState = {
        userId: userInfo.userId,
        img_src: '',
        message: '',
        isPublic: 1,
        likeUserIds: '',
        createTime: ''
    }
    const [state, dispatch] = useReducer(reducer, initalState);
    const history = useHistory();
    const location = useLocation();
    const handleImagePicker = uri => {
        dispatch({key: 'img_src', value: uri});
    }
    const save = () => {
        const data = _.cloneDeep(state);
        data.createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
        request('/card/createCard', data)
            .then(res => {
                if (res.success) {
                    onClose();
                    location.pathname === '/card' ?
                        onFetchCardList(0)
                    :
                        history.push('/card');
                    Alert.alert('打卡成功')
                }
            })
    }
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={styles.modalWrapper}>
                <View style={styles.headerWrapper}>
                    <Icon name='left' size={20} onPress={onClose} />
                    <Text style={styles.title}>打卡</Text>
                    <Text onPress={(state.message && state.img_src) ? save : () => {}} style={{...styles.btn, ...!(state.message && state.img_src) && {opacity: 0.5}}}>发表</Text>
                </View>
                <View style={styles.userInfoWrapper}>
                    <Image source={{uri: userInfo.avatar}} style={styles.avatar} />
                    <Text style={styles.userName}>{userInfo.userName}</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <TextInput style={styles.textarea} onChangeText={(value) => dispatch({key: 'message', value})} selectionColor='#38a' placeholder='写下你的感受...' multiline numberOfLines={3} maxLength={20} />
                    <Upload onSubmit={handleImagePicker} avatar={state.img_src} unAvatar type='photo' />
                    <Text onPress={() => dispatch({key: 'isPublic', value: state.isPublic ? 0 : 1})} style={{...styles.public, ...!state.isPublic && styles.self}}>{state.isPublic ? '所有人可见' : '仅自己可见'}</Text>
                </View>
            </View>
        </Modal>
    )
}

export { PubCard }
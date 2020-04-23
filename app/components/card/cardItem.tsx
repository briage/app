import * as React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../../style/cardItem';
import { request } from '../../util';

const { useState } = React;

function CardItem(props) {
    const { userInfo, cardInfo, goLogin } = props;
    const [state, setState] = useState(cardInfo);
    const handleLike = () => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以打卡哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            const newState = _.cloneDeep(state);
            request('/card/like', { userId: userInfo.userId, cardInfo: newState })
            .then(res => {
                if (res.success) {
                    newState.likeUserIds = res.likeUserIds;
                    setState(newState);
                }
            })
        }
    }
    return (
        <View style={styles.cardItemWrapper}>
            <Image source={{uri: state.img_src}} style={styles.image} />
            <Text style={styles.message}>{state.message}</Text>
            <View style={styles.betweenWrapper}>
                <View style={{...styles.userInfoWrapper, paddingLeft: 0, borderBottomLeftRadius: 8}}>
                    <Image style={styles.avatar} source={{uri: state.avatar}} />
                    <View>
                        <Text style={styles.userName}>{state.userName}</Text>
                        <Text style={styles.moment}>{moment(state.createTime).format('MM月DD日 HH:mm')}</Text>
                    </View>
                </View>
                <View onTouchEnd={handleLike}>
                    <Icon name={new RegExp(`${userInfo.userId}`, 'g').test(state.likeUserIds) ? 'heart' : 'hearto'} color='red' size={20} />
                    <Text style={styles.num}>{state.likeUserIds ? state.likeUserIds.split(/;|；/).length - 1 : 0}</Text>
                </View>
            </View>
        </View>
    )
}

export { CardItem };
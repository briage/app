import * as React from 'react';
import { View, Text, FlatList, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from  '../style/myInfo';
import { request } from '../util';
import _ from 'lodash';
import { useHistory } from 'react-router-native';
import { CardItem } from '../components/card/cardItem';
import { PubCard } from '../components/card/pubCard';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function Card(props) {
    const { userInfo, goLogin } = props;
    const [state, dispatch] = useReducer(reducer, {
        listData: [],
        offset: 0,
        total: 0,
        loading: false
    });
    const [visible, setVisible] = useReducer(reducer, false);
    const history = useHistory();
    const { width, height } = Dimensions.get('window');
    useEffect(() => {
        onFetchCardList(0);
    }, [])
    const onFetchCardList = (offset) => {
        const newState = _.cloneDeep(state);
        dispatch({key: 'loading', value: true});
        request('/card/queryCardList', {offset, userId: userInfo.userId})
        .then(res => {
            if (res && res.success) {
                let listData = newState.listData;
                if (offset === 0) {
                    listData = res.data;
                } else {
                    listData.push(...res.data);
                }
                dispatch({
                    listData,
                    offset,
                    total: res.total,
                    loading: false
                });
            }
        })
    }
    const doCard = () => {
        if (userInfo.userId) {
            setVisible(true)
        } else {
            Alert.alert('温馨提示', '需要登录后才可以打卡哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        }
    }
    const searchMore = () => {
        if (state.listData.length < state.total) {
            const newState = _.cloneDeep(state);
            onFetchCardList(newState.offset + 1);
        }
    }
    return (
        <>
            <PubCard visible={visible} onFetchCardList={onFetchCardList} onClose={() => setVisible(false)} userInfo={userInfo} />
            <View style={styles.header}>
                <Icon onPress={history.goBack} name='left' size={25} color='#aaa' />
                <Text style={styles.modalHeaderTitle}>动态广场</Text>
                <Icon onPress={doCard} name='checksquareo' size={25} />
            </View>
            <FlatList
                numColumns={2}
                style={{height: height - 70}}
                data={state.listData}
                onEndReachedThreshold={0.2}
                onEndReached={searchMore}
                onRefresh={() => onFetchCardList(0)}
                refreshing = {state.loading}
                renderItem={({item, index}) => <CardItem key={`${Math.random() * 1000 + index}`} userInfo={userInfo} goLogin={goLogin} cardInfo={item} />}
            />
        </>
    )
}

export { Card };
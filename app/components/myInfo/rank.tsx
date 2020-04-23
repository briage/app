import * as React from 'react';
import { Modal, FlatList, View, Text, Image } from 'react-native';
import _ from 'lodash';
import { styles } from '../../style/myInfo';
import { UserInfo } from '../../pages/myInfo';
import { request } from '../../util';

interface Props {
    visible: boolean,
    onClose: () => void,
    userInfo: UserInfo
}
const dataType = {
    studyTime: '学习课时数',
    achievementRate: '正确率/%',
    praticeNum: '做题数量'
}

const { useReducer } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function Rank(props: Props) {
    const { visible, onClose, userInfo } = props;
    const [state, dispatch] = useReducer(reducer, {
        rankData: {
            studyTime: [],
            achievementRate: [],
            praticeNum: []
        },
        selfRank: {
            studyTime: undefined,
            achievementRate: undefined,
            praticeNum: undefined
        },
        type: 'praticeNum'
    })
    const onFetchRankList = () => {
        request('/getRank', {})
            .then(res => {
                if (res.success) {
                    const selfRank = _.cloneDeep(state.selfRank);
                    for (let item in res.data) {
                        (res.data[item] as any[]).forEach((user, index) => {
                            if (user.userId === userInfo.userId) {
                                selfRank[item] = index + 1;
                                return;
                            }
                        })
                    }
                    dispatch({
                        rankData: res.data,
                        selfRank,
                        type: 'praticeNum'
                    });;
                }
            })
    }
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
            onShow={onFetchRankList}
        >
            <View style={styles.modalHeaderWrapper}>
                <Text style={styles.modalHeaderTitle}>排行榜</Text>
            </View>
            <View style={styles.rankListWrapper}>
                <View style={styles.rankNavBar}>
                    <Text style={{...styles.selectItem, ...state.type === 'praticeNum' && styles.actionTitle, ...{borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}} onPress={() => dispatch({key: 'type', value: 'praticeNum'})}>刷题榜</Text>
                    <Text style={{...styles.selectItem, ...state.type === 'achievementRate' && styles.actionTitle}} onPress={() => dispatch({key: 'type', value: 'achievementRate'})}>学霸榜</Text>
                    <Text style={{...styles.selectItem, ...state.type === 'studyTime' && styles.actionTitle, ...{borderTopRightRadius: 5, borderBottomRightRadius: 5}}} onPress={() => dispatch({key: 'type', value: 'studyTime'})}>广学榜</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
                    <Text style={{color: '#ccc'}}>排名</Text>
                    <Text style={{color: '#ccc'}}>{dataType[state.type]}</Text>
                </View>
                <FlatList
                    data={state.rankData[state.type]}
                    style={{height: 550}}
                    renderItem={({item, index}) => (
                        <View style={styles.rankItemWrapper}>
                            <View style={styles.rankItemUserWrapper}>
                                <Text style={styles.rankTitle}>{ index + 1 }</Text>
                                <Image style={styles.rankAvatar} source={{uri: item.avatar}} />
                                <Text style={styles.rankTitle}>{ item.userName }</Text>
                            </View>
                            <Text style={styles.rankTitle}>{ +item[state.type] || 0 }</Text>
                        </View>
                    )}
                />
                <View style={styles.footerInfoWrapper}>
                    <View style={styles.footerNameBar}>
                        <Image style={styles.rankAvatar} source={{uri: userInfo.avatar}} />
                        <View style={styles.rankNameBox} >
                            <Text style={{...styles.rankTitle, color: '#000'}}>{ userInfo.userName }</Text>
                            <Text style={{paddingLeft: 5}}>排名 { +state.selfRank[state.type] || '暂无排名' }</Text>
                        </View>
                    </View>
                    <Text style={{...styles.rankTitle, color: '#000'}}>{ +userInfo[state.type] || 0 }</Text>
                </View>
            </View>
            
            
            
        </Modal>
    )
}

export { Rank };
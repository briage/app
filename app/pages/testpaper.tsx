import * as React from 'react';
import { ScrollView, View, Text, Modal, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../style/testpaper';
import _ from 'lodash';
import { request } from '../util';
import { useHistory } from 'react-router-native';
import { diffculty, testType, testNumName } from '../config/meta';
import { TestPaperList } from '../components/core/testPaperList';
import { ErrorBook } from '../components/myInfo/errbook';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function TestPaper(props) {
    const [state, dispatch] = useReducer(reducer, {
        hotList: [],
        loading: false,
        offset: 0
    })
    const [errorBookVisible, setErrorBookVisible] = useReducer(reducer, false);
    const history = useHistory();
    const { userInfo, goLogin } = props;
    useEffect(() => {
        onFetchTestPaper(0)
    }, [])

    const onFetchTestPaper = (offset = 0) => {
        dispatch({key: 'loading', value: true})
        request('/test-paper/queryTestPaper', {hot: true, offset, diffculty: userInfo.level || 0, selfset: userInfo.selfset})
            .then (res => {
                if (res && res.success) {
                    let hotList = _.cloneDeep(state.hotList);
                    if (offset) {
                        hotList.push(...res.data);
                    } else {
                        hotList = res.data;
                    }
                    dispatch(
                        {
                            hotList,
                            loading: false,
                            offset
                        }
                    );
                }
            })
    }
    const more = () => {
        const newState = _.cloneDeep(state);
        onFetchTestPaper(newState.offset + 1)
    }
    const ItemTest = (type) => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以享受该功能哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            const queryData = {
                selfset: userInfo.selfset,
                diffculty: userInfo.level || 0,
                testpaperName: `${testType[type]}专项练习`,
                [testNumName[type]]: 1,
                type: 1
            }
            request('/test-paper/createTestPaper', queryData)
                .then(res => {
                    if (res.success) {
                        history.push(`/test/${res.data.insertId}`)
                    }
                })
        }
    }
    const levelTest = () => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以享受该功能哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            request('/test-paper/queryTestPaper', {
                isTest: 1,
                selfset: userInfo.selfset
            })
            .then(res => {
                if (res.success) {
                    let testpaper, testpaperId;
                    const length = res.data.length;
                    testpaper = res.data[Math.floor(Math.random() * length)];
                    testpaperId = testpaper.testpaperId;
                    history.push(`/test/${testpaperId}`)
                }
            })
        }
    }
    return (
        <ScrollView>
            <ErrorBook visible={errorBookVisible} userInfo={userInfo} goLogin={goLogin} onClose={() => setErrorBookVisible(false)} />
            <View style={styles.headerWrapper}>
                <Text style={styles.headerTitle}>训练营</Text>
            </View>
            <View style={styles.btnWrapper}>
                <View onTouchEnd={() => history.push('/search-testpaper')} style={styles.btnItem}>
                    <Icon name='folder' color='#38f' size={40} />
                    <Text style={styles.btnText}>套题</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 3)} style={styles.btnItem}>
                    <Icon name='headphones' color='#38f' size={40} />
                    <Text style={styles.btnText}>听力</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 2)} style={styles.btnItem}>
                    <Icon name='pencil-square' color='#38f' size={40} />
                    <Text style={styles.btnText}>作文</Text>                    
                </View>
                <View onTouchEnd={ItemTest.bind(this, 0)} style={styles.btnItem}>
                    <Icon name='check-circle-o' color='#38f' size={40} />
                    <Text style={styles.btnText}>单选</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 1)} style={styles.btnItem}>
                    <Icon name='check-square' color='#38f' size={40} />
                    <Text style={styles.btnText}>多选</Text>
                </View>
                <View onTouchEnd={() => setErrorBookVisible(true)} style={styles.btnItem}>
                    <Icon name='times-circle' color='#38f' size={40} />
                    <Text style={styles.btnText}>错题</Text>
                </View>
                <View onTouchEnd={levelTest} style={styles.btnItem}>
                    <Icon name='tumblr-square' color='#38f' size={40} />
                    <Text style={styles.btnText}>测评</Text>
                </View>
                <View onTouchEnd={() => history.push('/game')} style={styles.btnItem}>
                    <Icon name='gamepad' color='#38f' size={40} />
                    <Text style={styles.btnText}>游戏</Text>
                </View>
            </View>
            <View style={styles.listWrapper}>
                <Text style={styles.subTitle}>热门推荐</Text>
                {
                    <FlatList
                        style={styles.flatList}
                        data={state.hotList}
                        renderItem={({item, index}) => <TestPaperList userInfo={userInfo} goLogin={goLogin} key={`test-paper${index}`} testPaperInfo={item} />}
                        onEndReachedThreshold={0.3}
                        onEndReached={more}
                        onRefresh={() => onFetchTestPaper(0)}
                        refreshing={state.loading}
                    />
                }
            </View>
        </ScrollView>
    )
}

export { TestPaper };
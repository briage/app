import * as React from 'react';
import { ScrollView, View, Text, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../style/testpaper';
import _ from 'lodash';
import { request } from '../util';
import { useHistory } from 'react-router-native';
import { diffculty, testType, testNumName } from '../config/meta';
import { TestPaperList } from '../components/core/testPaperList';

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
        hotList: []
    })
    const history = useHistory();
    const { userInfo, goLogin } = props;
    useEffect(() => {
        onFetchTestPaper()
    }, [])

    const onFetchTestPaper = () => {
        request('/test-paper/queryTestPaper', {hot: true, offset: 0, diffculty: userInfo.level || 0, selfset: userInfo.selfset})
            .then (res => {
                if (res && res.success) {
                    dispatch({hotList: res.data});
                }
            })
    }
    const ItemTest = (type) => {
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
    return (
        <ScrollView>
            {/* <Modal></Modal> */}
            <View style={styles.headerWrapper}>
                <Text style={styles.headerTitle}>训练营</Text>
            </View>
            <View style={styles.btnWrapper}>
                <View onTouchEnd={() => history.push('/search-testpaper')} style={styles.btnItem}>
                    <Icon name='book' color='#38f' size={40} />
                    <Text style={styles.btnText}>套题</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 3)} style={styles.btnItem}>
                    <Icon name='headphones' color='purple' size={40} />
                    <Text style={styles.btnText}>听力</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 2)} style={styles.btnItem}>
                    <Icon name='pencil-square' color='yellow' size={40} />
                    <Text style={styles.btnText}>作文</Text>                    
                </View>
                <View onTouchEnd={ItemTest.bind(this, 0)} style={styles.btnItem}>
                    <Icon name='check-circle-o' color='skyblue' size={40} />
                    <Text style={styles.btnText}>单选</Text>
                </View>
                <View onTouchEnd={ItemTest.bind(this, 1)} style={styles.btnItem}>
                    <Icon name='check-square' color='yellowgreen' size={40} />
                    <Text style={styles.btnText}>多选</Text>
                </View>
                <View style={styles.btnItem}>
                    <Icon name='times-circle' color='red' size={40} />
                    <Text style={styles.btnText}>错题</Text>
                </View>
            </View>
            <Text style={styles.subTitle}>热门推荐</Text>
            {
                
                <FlatList
                    style={styles.flatList}
                    data={state.hotList}
                    renderItem={({item, index}) => <TestPaperList userInfo={userInfo} goLogin={goLogin} key={`test-paper${index}`} testPaperInfo={item} />}
                />
            }
        </ScrollView>
    )
}

export { TestPaper };
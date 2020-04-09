import * as React from 'react';
import { Modal, View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from  '../../style/myInfo';
import { request } from '../../util';
import _ from 'lodash';
import { useHistory } from 'react-router-native';
import moment from 'moment';

const { useReducer } = React;

function reducer(state, action) {
    return action;
}

function MissionCenter(props) {
    const { userInfo, visible, onClose } = props;
    const [state, dispatch] = useReducer(reducer, {
        listData: []
    });
    const history = useHistory();
    const onFetchMissionList = () => {
        const queryData = {
            courseIds:userInfo.courseIds,
            currentTime: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
        }
        request('/mission/queryMissionList', queryData)
            .then(res => {
                if (res && res.success) {
                    dispatch({ listData: res.data });
                }
            })
    }
    const renderItem = ({item, index}) => (
        <View style={styles.borderBottom}>
            <Text style={styles.smallText}>{item.courseName}</Text>
            <View style={styles.navRow}>
                <Text style={styles.title}>{!item.message ? '作业' : item.message}</Text>
                { item.testpaperId && <Icon name='form' color='#38f' size={25} onPress={() => history.push(`/test/${item.testpaperId}`)} /> }
            </View>
            <Text style={{...styles.smallText, textAlign: 'right'}}>发布人：{item.creatorName}</Text>
        </View>
    )
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
            onShow={onFetchMissionList}
            presentationStyle='formSheet'
        >
            <View style={styles.modalHeaderWrapper}>
                <Text style={styles.modalHeaderTitle}>任务列表</Text>
            </View>
            <FlatList
                data={state.listData}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={{textAlign: 'center'}}>暂无任务</Text>}
            />
        </Modal>
    )
}

export { MissionCenter };
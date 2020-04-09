import * as React from 'react';
import { Modal, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from  '../../style/myInfo';
import { request } from '../../util';
import _ from 'lodash';
import { useHistory } from 'react-router-native';

const { useReducer } = React;

function reducer(state, action) {
    return action;
}

function ErrorBook(props) {
    const { userInfo, visible, onClose, goLogin } = props;
    const [state, dispatch] = useReducer(reducer, {
        listenNum: 0,
        onlyChoiceNum: 0,
        multifyChoiceNum: 0
    });
    const history = useHistory();
    const onFetchErrorBook = () => {
        if (!userInfo.userId) {
            Alert.alert('温馨提示', '需要登录后才可以享受该功能哦', [
                { text: '去登录', onPress: () => goLogin(false) },
                { text: '再看看', style:'cancel' }
            ])
        } else {
            request('/error-book/queryErrorBookInfo', {errorTestBookId: userInfo.errorTestId})
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        listenNum: res.data.listenNum || 0,
                        onlyChoiceNum: res.data.onlyChoiceNum || 0,
                        multifyChoiceNum: res.data.multifyChoiceNum || 0
                    });
                }
            })
        }
    }
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
            onShow={onFetchErrorBook}
        >
            <View style={{...styles.header, justifyContent: 'flex-start'}}>
                <Icon onPress={onClose} name='left' size={25} color='#aaa' />
                <Text style={{...styles.modalHeaderTitle, paddingLeft: 110}}>错题本</Text>
            </View>
            <View style={styles.navRow} onTouchEnd={() => history.push(`/test/errorTestBookId=${userInfo.errorTestId}&&type=1`)}>
                <Text style={styles.title}>单选题</Text>
                <Text style={styles.title}> {state.onlyChoiceNum} 个 </Text>
            </View>
            <View style={styles.navRow} onTouchEnd={() => history.push(`/test/errorTestBookId=${userInfo.errorTestId}&&type=2`)}>
                <Text style={styles.title}>多选题</Text>
                <Text style={styles.title}> {state.multifyChoiceNum} 个 </Text>
            </View>
            <View style={styles.navRow} onTouchEnd={() => history.push(`/test/errorTestBookId=${userInfo.errorTestId}&&type=4`)}>
                <Text style={styles.title}>听力题</Text>
                <Text style={styles.title}> {state.listenNum} 个 </Text>
            </View>
        </Modal>
    )
}

export { ErrorBook };
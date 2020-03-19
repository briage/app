import * as React from 'react';
import { Modal, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from  '../../style/myInfo';
import { request } from '../../util';
import _ from 'lodash';

const { useReducer } = React;

function reducer(state, action) {
    return action;
}

function ErrorBook(props) {
    const { userInfo, visible, onClose } = props;
    const [state, dispatch] = useReducer(reducer, {
        listenNum: 0,
        onlyChoiceNum: 0,
        multifyChoiceNum: 0
    })
    const onFetchErrorBook = () => {
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
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
            onShow={onFetchErrorBook}
        >
            <View style={styles.header}>
                <Icon onPress={onClose} name='left' size={25} color='#aaa' />
                <Text style={{...styles.modalHeaderTitle, paddingLeft: 110}}>错题本</Text>
            </View>
            <View style={styles.navRow}>
                <Text style={styles.title}>单选题</Text>
                <Text style={styles.title}> {state.onlyChoiceNum} 个 </Text>
            </View>
            <View style={styles.navRow}>
                <Text style={styles.title}>多选题</Text>
                <Text style={styles.title}> {state.multifyChoiceNum} 个 </Text>
            </View>
            <View style={styles.navRow}>
                <Text style={styles.title}>听力题</Text>
                <Text style={styles.title}> {state.listenNum} 个 </Text>
            </View>
        </Modal>
    )
}

export { ErrorBook };
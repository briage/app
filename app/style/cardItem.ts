import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    cardItemWrapper: {
        borderRadius: 10,
        width: width / 2,
        height: (height / 2) - 50,
        padding: 5
    },
    image: {
        width: '100%',
        height: (height / 3) - 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    message: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        height: 35
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 12,
        marginRight: 10
    },
    userInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    betweenWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    userName: {
        fontSize: 12
    },
    num: {
        fontSize: 12,
        textAlign: 'center'
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        height: 60,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    btn: {
        height: 30,
        borderRadius: 15,
        fontSize: 14,
        backgroundColor: '#3af',
        color: '#fff',
        width: 50,
        textAlign: 'center',
        padding: 5
    },
    title: {
        fontSize: 18,
    },
    textarea: {
        fontSize: 18
    },
    public: {
        height: 22,
        borderRadius: 11,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#38f',
        width: 100,
        textAlign: 'center',
        padding: 2,
        color: '#38f',
        marginTop: 10,
        fontSize: 12
    },
    self: {
        borderColor: '#f40',
        color: '#f40'
    },
    modalWrapper: {
        backgroundColor: '#eee',
        height
    },
    contentWrapper: {
        padding: 10,
        backgroundColor: '#fff'
    },
    moment: {
        fontSize: 10,
        color: '#ccc'
    }
})

export { styles };
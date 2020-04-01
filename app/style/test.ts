import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    headerTitle: {
        fontSize: 20,
        width: '60%',
        overflow: 'hidden'
    },
    titleWrapper: {
        padding: 10,
        backgroundColor: '#fff',
        minHeight: 490
    },
    title: {
        fontSize: 17,
    },
    option: {
        fontSize: 17,
        padding: 5,
        color: 'skyblue'
    },
    answerArea: {
        zIndex: 1000,
        height: 200,
        backgroundColor: '#fff',
        borderTopColor: '#aaa',
        borderTopWidth: 2,
        borderStyle: 'solid',
    },
    answerHeader: {
        textAlign: 'center',
        fontSize: 20
    },
    selectArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100
    },
    listenWrapper: {
        height: 80,
        width: '100%',
        color: '#fff',
        backgroundColor: '#fff'
    },
    submitBtn: {
        color: '#38f',
        fontSize: 18
    },
    modalSubmitBtn: {
        position: 'absolute',
        bottom: 10,
        width: '100%'
    }
})

export { styles };
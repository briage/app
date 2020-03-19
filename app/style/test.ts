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
        width: '70%'
    },
    titleWrapper: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
    },
    option: {
        fontSize: 16,
        padding: 5,
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
        height: 140
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
    }
})

export { styles };
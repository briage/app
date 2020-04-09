import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    contentWrapper: {
        padding: 10,
        paddingTop: 0
    },
    back: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        height: 40,
        fontSize: 18,
        padding: 5
    },
    titleWrapper: {
        width: '100%',
        height: 50,
        paddingLeft: 90,
    },
    tip: {
        fontSize: 15,
        color: '#ccc'
    },
    achevie: {
        color: '#38f',
        fontSize: 18,
        height: 40,
        padding: 5
    },
    subTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 15,
    },
    loginBtn: {
        marginTop: 15
    }
})

export { styles };
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#fff',
        height: 60
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 15
    },
    btnWrapper: {
        marginTop: 5,
        padding: 20,
        paddingBottom: 0,
        paddingLeft: 40,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },
    btnItem: {
        width: 80,
        height: 80
    },
    btnText: {
        fontSize: 15,
        padding: 4
    },
    subTitle: {
        fontSize: 18,
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 10
    },
    flatList: {
        padding: 10,
        backgroundColor: '#fff'
    }
})
export { styles };
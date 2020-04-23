import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    header: {
        fontSize: 18,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    answerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 50,
    },
    answerItem: {
        fontSize: 18,
        height: 30,
        width: 30,
        borderBottomColor: '#38f',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        margin: 10,
    },
    stopWrapper: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    playBtn: {
        height: 40,
        fontSize: 18,
        color: '#38f',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#38f',
        margin: 10,
        borderRadius: 20,
        padding: 6
    },
    time: {
        fontSize: 18
    },
    selectWrapper: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playWrapper: {
        height,
        backgroundColor: '#fff'
    }
})

export { styles };
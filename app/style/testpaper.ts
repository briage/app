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
        paddingLeft: 30,
        paddingTop: 10,
        flexDirection: 'row',
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
    listWrapper: {
        padding: 5,
        marginTop: 5,
        backgroundColor:'#fff'
    },
    subTitle: {
        fontSize: 18,
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    flatList: {
        padding: 5,
    }
})
export { styles };
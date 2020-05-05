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
        paddingLeft: 40,
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
        fontSize: 12,
        paddingLeft: 4
    },
    listWrapper: {
        padding: 5,
        marginTop: 5,
        backgroundColor:'#fff'
    },
    subTitle: {
        fontSize: 16,
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        color: '#38f'
    },
    flatList: {
        padding: 5,
    }
})
export { styles };
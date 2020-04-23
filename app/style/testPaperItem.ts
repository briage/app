import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    row: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        width: '100%',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 14,
        height: 40,
        fontWeight: 'bold'
    },
    tip: {
        fontSize: 12,
        color: '#aaa'
    },
    star: {
        fontSize: 16,
        color: '#f40'
    },
    diffcultyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 4
    }
})

export { styles };
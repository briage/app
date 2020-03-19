import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    row: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        width: '100%'
    },
    title: {
        fontSize: 18,
        height: 40,
        color: '#38f'
    },
    tip: {
        fontSize: 14
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
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    labelsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    labelBtnActive: {
        borderColor: '#38f'
    },
    labelBtn: {
        borderColor: '#ccc',
        borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 1,
        margin: 5,
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    label: {
        color: '#aaa'
    }
})

export { styles };
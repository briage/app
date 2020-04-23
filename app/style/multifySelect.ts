import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    labelsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    labelBtnActive: {
        borderColor: '#38f'
    },
    labelBtn: {
        borderColor: '#000',
        borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 1,
        margin: 3,
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    label: {
        color: '#000'
    },
    activeLabel: {
        color: '#38f'
    }
})

export { styles };
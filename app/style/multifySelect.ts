import { StyleSheet } from "react-native";

const colorArr = [
    '#FFC0CB',
    '#FFDEAD',
    '#FF1493',
    '#FF3030'
]

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
        color: colorArr[Math.floor(Math.random()*4)]
    }
})

export { styles };
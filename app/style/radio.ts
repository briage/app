import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    radioWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    labelWrapper: {
        padding: 10,
        margin: 10,
        height: 30,
        borderRadius: 15,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionWrapperColor: {
        borderColor: '#38f'
    },
    actionLabelColor: {
        color: '#38f'
    },
    label: {
        fontSize: 16,
    }
})

export { styles };
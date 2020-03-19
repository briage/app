import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fixed: {
        zIndex: 1000,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        // paddingLeft: 25,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    navItem: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        width: 60,
    }
})

export { styles };
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fixed: {
        zIndex: 1000,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        justifyContent: 'space-around',
    },
    navItem: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    }
})

export { styles };
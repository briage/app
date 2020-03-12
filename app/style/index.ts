import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchWrapper: {
        height: 30,
        width: '80%',
        flexDirection: 'row',
        borderRadius: 4,
        alignItems: 'center',
        paddingLeft: 5,
        borderStyle: "solid",
        borderColor: '#ccc',
        borderWidth: 1,
        marginLeft: '10%',
        marginTop: 10,
        backgroundColor: '#fff',
        opacity: 0.7
        
    },
    searchBarWrapper: {
        zIndex: 1000,
        position: 'absolute',
        width: '100%'
    }
})

export { styles };
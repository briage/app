import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        zIndex: 100,
        padding: 5
    },
    searchInput: {
        width: '75%',
        height: 50
    },
    cancleButton: {
        margin: 0, 
        padding: 0, 
        backgroundColor: '#fff'
    },
    rankBar: {
        width: '100%',
        overflow: 'scroll',
        flexDirection: 'row',
        paddingTop: 5,
        backgroundColor: '#fff',
        height: 50,
        justifyContent: 'space-around'
    },
    rankButton: {
        margin: 0,
        padding: 0,
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rankText: {
        fontSize: 15
    },
    detailWrapper: {
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    moneyWrapper: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    moneyInput: {
        width: 150,
        height: 40,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#ccc',
        justifyContent: 'center',
        margin: 10
    },
    moreText: {
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#fff'
    }
})

export { styles };
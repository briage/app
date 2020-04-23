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
        fontSize: 14
    },
    modalBtn: {
        fontSize: 16,
        color: '#38f',
        padding: 10,
        
    },
    modalHeaderWrapper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth: 5,
        borderStyle: 'solid'
    },
    detailWrapper: {
       padding:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
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
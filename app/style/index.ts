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
    },
    careerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        backgroundColor: '#fff',
        marginTop: 15,
        marginBottom: 15
    },
    dataShowHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9BCD9B',
        width: '30%',
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40
    },
    dataShowHeaderFont: {
        color: '#fff',
        fontSize: 16
    },
    dataShowItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '23%'
    },
    tip: {
        fontSize: 11,
        color: '#ccc',
        marginTop: 10
    },
    freeListWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // padding: 5
    },
    subTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    subTitle: {
        fontSize: 20
    },
    subTitleMore: {
        color: '#38f',
        fontSize: 16
    }
})

export { styles };
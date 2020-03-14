import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    longListWrapper: {
        margin: 10 
    },
    itemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        marginBottom: 10
    },
    imgWrapper: {
        height: 70,
        width: '35%',
        borderRadius: 3,
        marginRight: 10
    },
    contentWrapper: {
        height:70,
        width: '65%'
    },
    title: {
        fontSize: 20,
        height: 50
    },
    money: {
        color: '#f40',
        fontSize: 18,
    },
    smallFont: {
        color: '#ccc',
        fontSize: 13,
    },
    colImgWrapper: {
        width: '100%',
        height: 70,
        borderRadius: 5
    }
});

export { styles };
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
        fontSize: 16,
        height: 40
    },
    money: {
        color: '#f40',
        fontSize: 16,
    },
    smallFont: {
        color: '#555',
        fontSize: 13,
    },
    colImgWrapper: {
        width: '100%',
        height: 90,
        borderRadius: 5
    }
});

export { styles };
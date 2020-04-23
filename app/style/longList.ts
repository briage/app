import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    longListWrapper: {
        padding: 10,
        maxHeight: height - 110,
        backgroundColor: '#fff',
    },
    itemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        marginBottom: 10,
    },
    imgWrapper: {
        height: 70,
        width: '40%',
        borderRadius: 3,
        marginRight: 10
    },
    contentWrapper: {
        height: 70,
        width: '58%'
    },
    title: {
        fontSize: 16,
        height: 45
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
    },
    moneyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export { styles };
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerWrapper: {
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 1000
    },
    headerTitle: {
        fontSize: 20
    },
    tableWrapper: {
        margin: 10
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5
    
    },
    flatList: {
        backgroundColor: '#fff',
    },
    tipWrapper: {
        height: 120,
        width: '100%',
        backgroundColor: '#fff',
        textAlign: 'center',
        paddingTop: 20
    }
})

export { styles };
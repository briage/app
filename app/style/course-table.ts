import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerWrapper: {
        height: 80,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#fff',
        zIndex: 1000
    },
    headerTitle: {
        fontSize: 22
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
        padding: 10,
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
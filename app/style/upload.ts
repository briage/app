import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    uploadWrapper: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    }, 
    title: {
        fontSize: 16
    }
})

export { styles };
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    videoWrapper: {
        width: '100%',
        height: 200
    },
    subCourseTitle: {
        fontSize: 16,
        color: '#fff',
        zIndex: 100,
        position: 'absolute',
        top: 0,
        width: '100%',
        textAlign: 'right',
        opacity: 0.5,
        padding: 10
    },
    navBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        margin: 10
    },
    bottonBorder: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    navBar: {
        width: '50%',
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 10

    },
    actionNavBar: {
        borderBottomColor: '#38f',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        color: '#38f'
    },
    detailWrapper: {
        padding: 10,
    },
    courseTitle: {
        fontSize: 20,
        paddingLeft: 10
    },
    money: {
        color: '#f40',
        padding: 10,
        paddingLeft: 0,
        fontSize: 15
    },
    tip: {
        fontSize: 15,
        color: '#aaa',
        padding: 10,
        width: 210
    },
    teacherAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    teacherName: {
        fontSize: 16,
        paddingLeft: 10
    },
    subCourseItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 2,
        padding: 10,
        borderRadius: 2,
        backgroundColor: '#eee'
    }
})

export { styles };
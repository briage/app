import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 25
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 35
    },
    recentListWrapper: {
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 10
    },
    navWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 2
    },
    modalNavRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderStyle: 'solid'
    },
    title: {
        fontSize: 16
    },
    modalHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderStyle: 'solid',
    },
    modalHeaderTitle: {
        fontSize: 20,
        padding: 10
    },
    footerInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.9,
        height: 70,
        zIndex: 1000,
        paddingLeft: 10,
        paddingRight: 10,
    },
    rankAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    selectItem: {
        color: '#38f',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 16
    },
    rankNameBox: {
        padding: 10,
    },
    rankItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 2,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#F0F8FF',
        borderRadius: 5,
        height: 80
    },
    rankItemUserWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rankListWrapper: {
        backgroundColor: '#fff',
        opacity: 0.9
    },
    rankNavBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#38f',
        margin: 10
    },
    actionTitle: {
        backgroundColor: '#38f',
        color: '#fff'
    },
    rankTitle: {
        fontSize: 16,
        padding: 5,
        color: '#666'
    },
    footerNameBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    smallText: {
        fontSize: 12,
        color: '#000',
        padding: 5,
    },
    vipWrapper: {
        height: 20,
        width: 100,
        borderRadius: 10,
        backgroundColor: '#000',
        margin: 5,
        alignItems: 'center'
    },
    vipText: {
        fontSize: 14,
        color: 'gold'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    missionMsg: {
        fontSize: 15,
        color: '#38e'
    }
})

export { styles };
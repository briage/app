import * as React from 'react';
import { View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { styles } from '../../style/footerBar';
import { useLocation } from 'react-router-native';

function FooterBar(props) {
    const location = useLocation();
    const history = useHistory();
    return (
        <View style={styles.fixed}>
            <View style={styles.navItem} onTouchEnd={() => {history.push('/')}}>
                <Icon name='home' size={20} color={location.pathname === '/' ? '#38f' : '#000'} />
                <Text style={{color: location.pathname === '/' ? '#38f' : '#000'}}>首页</Text>
            </View>
            <View style={styles.navItem} onTouchEnd={() => {history.push('/testpaper')}}>
                <Icon name='search1' size={20} color={location.pathname === '/testpaper' ? '#38f' : '#000'} />
                <Text style={{color: location.pathname === '/testpaper' ? '#38f' : '#000'}}>练习</Text>
            </View>
            <View style={styles.navItem} onTouchEnd={() => {history.push('/table')}}>
                <Icon name='home' size={20} color={location.pathname === '/table' ? '#38f' : '#000'} />
                <Text style={{color: location.pathname === '/table' ? '#38f' : '#000'}} >课程表</Text>
            </View>
            <View style={styles.navItem} onTouchEnd={() => {history.push('/myInfo')}}>
                <Icon name='user' size={20} color={location.pathname === '/myInfo' ? '#38f' : '#000'} />
                <Text style={{color: location.pathname === '/myInfo' ? '#38f' : '#000'}}>我的</Text>
            </View>
        </View>
    )
}

export { FooterBar };
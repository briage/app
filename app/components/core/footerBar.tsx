import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { styles } from '../../style/footerBar';
import { useLocation } from 'react-router-native';

function FooterBar(props) {
    const location = useLocation();
    const {height} = Dimensions.get('window');
    return (
        <View style={styles.fixed}>
            <Link to='/'>
                <View style={styles.navItem}>
                    <Icon name='home' size={20} color={location.pathname === '/' ? '#38f' : '#000'} />
                    <Text style={{color: location.pathname === '/' ? '#38f' : '#000'}}>首页</Text>
                </View>
            </Link>
            <Link to='/testpaper'>
                <View style={styles.navItem}>
                    <Icon name='search1' size={20} color={location.pathname === '/testpaper' ? '#38f' : '#000'} />
                    <Text style={{color: location.pathname === '/testpaper' ? '#38f' : '#000'}}>练习</Text>
                </View>
            </Link>
            <Link to='/table'>
                <View style={styles.navItem}>
                    <Icon name='home' size={20} color={location.pathname === '/table' ? '#38f' : '#000'} />
                    <Text style={{color: location.pathname === '/table' ? '#38f' : '#000'}} >课程表</Text>
                </View>
            </Link>
            <Link to='/myInfo'>
                <View style={styles.navItem}>
                    <Icon name='user' size={20} color={location.pathname === '/myInfo' ? '#38f' : '#000'} />
                    <Text style={{color: location.pathname === '/myInfo' ? '#38f' : '#000'}}>我的</Text>
                </View>
            </Link>
        </View>
    )
}

export { FooterBar };
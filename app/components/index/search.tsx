import * as React from 'react';
import { Link, useHistory } from "react-router-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from '../../style/index';


function SearchBar() {
    const history = useHistory();
    return (
        <Link style={styles.searchBarWrapper} to='/search/0'>
            <View style={styles.searchWrapper}>
                <Icon name='search1' />
                <Text>搜索课程</Text>
            </View>
        </Link>
    )
}

export { SearchBar };
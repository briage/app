import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'react-router-native';
import { styles } from '../../style/longList';

interface Props {
    uri: string,
    title: string,
    money: number,
    progress?: number,
    link: string,
    usedNum?: number
}

function ColCourseItem(props: Props) {
    const { uri, title, money, progress, link, usedNum } = props;
    return (
        <Link to={link}>
            <View style={{width: 150}}>
                <View style={styles.colImgWrapper}>
                    <Image style={styles.colImgWrapper} source={{uri}} />
                </View>
                <View>
                    <Text style={styles.title}> {title} </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.money}> {money ? `¥${money}` : '免费'} </Text>
                        <Text style={styles.smallFont}>{`${usedNum}人最近报名`}</Text>
                    </View>
                    { progress !== undefined && <Text style={styles.smallFont}>{progress ? `已学${progress}%` : '未开始'}</Text>}
                </View>
            </View>
        </Link>
        
    )
}

export { ColCourseItem };
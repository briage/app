import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import { styles } from '../../style/longList';

interface Props {
    uri: string,
    title: string,
    money?: number,
    progress?: number,
    link: string,
    usedNum?: number,
    width: number,
    padding?: number
}

function ColCourseItem(props: Props) {
    const { uri, title, money, progress, link, usedNum, width, padding } = props;
    const history = useHistory();
    return (
        <View style={{width, padding: padding || 0}} onTouchEnd={() => history.push(link)}>
            <View style={styles.colImgWrapper}>
                <Image style={styles.colImgWrapper} source={{uri}} />
            </View>
            <View>
                <Text style={money !== undefined ? styles.title : styles.smallFont}>{title}</Text>
                <View style={styles.moneyRow}>
                    { money !== undefined &&  <Text style={styles.money}>{money ? `¥${money}` : '免费'}</Text>}
                    { usedNum !== undefined && <Text style={styles.smallFont}>{`${usedNum}人最近报名`}</Text>}
                </View>
                { progress !== undefined && <Text style={styles.smallFont}>{progress ? `已学${progress}%` : '未开始'}</Text>}
            </View>
        </View>
    )
}

export { ColCourseItem };
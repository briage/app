import * as React from 'react';
import { ScrollView, View, Image, Text, RefreshControl } from 'react-native';
import { Button } from 'beeshell';
import { useHistory } from 'react-router-native';
import { styles } from '../../style/longList';
import _ from 'lodash';

interface Props {
    data: any[],
    total: number,
    onRefresh?: () => Promise<{success: boolean, data: [], total: number}>,
    onEndReached?: () => void
    renderItem?: ({item, index}) => React.ReactElement,
    nameKey: string,
    onItemClick?: (uri) => void,
    ref?: (c) => void,
    usedNum?: number
}

const { useState } = React;

function LongListComponent(props: Props) {
    const isCourse = !props.onItemClick;
    const history = useHistory();
    const [refreshing, setRefreshing] = useState(false);
    const renderItem = (item, index) => {
        const linkProps = {
            to: '',
            onTouchEnd: props.onItemClick
        };
        if (isCourse) {
            linkProps.to = `/course/${item.courseId}`;
            delete linkProps.onTouchEnd;
            console.log(linkProps.to)
        } else {
            linkProps.onTouchEnd = () => {
                props.onItemClick(item.video_src);
            }
            delete linkProps.to;
        }
        return (
            <View style={styles.itemWrapper} onTouchEnd={isCourse ? () => history.push(linkProps.to) : linkProps.onTouchEnd}>
                {
                    isCourse && <Image style={styles.imgWrapper} source={{uri: item.image_src && item.image_src}} />
                }
                <View style={styles.contentWrapper}>
                    <View>
                        <Text style={styles.title}>{item[props.nameKey]}</Text>
                    </View>
                    <View style={styles.moneyRow}>
                        <Text style={styles.money}>{!_.isNaN(+item.money) ? +item.money !== 0 ? `￥${item.money}` : '免费' : ''}</Text>
                        <Text style={styles.smallFont}>{(item.studentIds && item.studentIds.split(/;|；/).length) || 0}人最近报名</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.longListWrapper} refreshControl={<RefreshControl
            enabled
            colors={['#ccc']}
            progressViewOffset={50}
            refreshing={refreshing}
            onRefresh={props.onRefresh}
            />}>
            {
                props.data && props.data.map(renderItem)
            }
            { props.data && (props.data.length < props.total) ? <Button type='text' onPress={props.onEndReached} >查看更多</Button> : <Text style={{textAlign: 'center'}} >没有更多数据</Text>}
        </ScrollView>
    )
}

export { LongListComponent, Props };
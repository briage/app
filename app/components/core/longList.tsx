import * as React from 'react';
import { ScrollView, View, Image, Text, RefreshControl } from 'react-native';
import { Button } from 'beeshell';
import { Link } from 'react-router-native';
import { styles } from '../../style/longList';
import _ from 'lodash';

interface Props {
    data: any[],
    total: number,
    onRefresh: () => Promise<{success: boolean, data: [], total: number}>,
    onEndReached?: () => void
    renderItem?: ({item, index}) => React.ReactElement,
    nameKey: string,
    onItemClick?: (uri) => void,
    ref?: (c) => void
}

const { useState } = React;

function LongListComponent(props: Props) {
    const isCourse = !props.onItemClick;
    const linkProps = {
        to: '',
        onTouchEnd: props.onItemClick
    };
    const [refreshing, setRefreshing] = useState(false);
    const renderItem = (item, index) => {
        if (isCourse) {
            linkProps.to = `/course/${item.courseId}`;
            delete linkProps.onTouchEnd;
        } else {
            linkProps.onTouchEnd = () => {
                props.onItemClick(item.video_src);
            }
            delete linkProps.to;
        }
        return (
            <Link key={'course' + index} { ...linkProps } >
                <View style={styles.itemWrapper}>
                    {
                        isCourse && <Image style={styles.imgWrapper} source={{uri: item.image_src && item.image_src}} />
                    }
                    <View style={styles.contentWrapper}>
                        <View>
                            <Text style={styles.title}>{item[props.nameKey]}</Text>
                        </View>
                        <View>
                            <Text style={styles.money}>{!_.isNaN(+item.money) ? +item.money !== 0 ? `￥${item.money}` : '免费' : ''}</Text>
                        </View>
                    </View>
                </View>
            </Link>
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
                props.data.map(renderItem)
            }
            { props.data.length < props.total ? <Button type='text' onPress={props.onEndReached} >查看更多</Button> : <Text style={{textAlign: 'center'}} >没有更多数据</Text>}
        </ScrollView>
    )
}

export { LongListComponent, Props };
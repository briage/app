import * as React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { Longlist, LonglistProps } from 'beeshell';
import { Link } from 'react-router-native';
import { styles } from '../../style/longList';
import _ from 'lodash';

interface Props {
    data: any[],
    total: number,
    onRefresh: () => void,
    onEndfresh: () => void
    renderItem?: ({item, index}) => React.ReactElement,
    nameKey: string,
    onItemClick?: (uri) => void,
    ref?: (c) => void
}

function LongListComponent(props: Props) {
    const isCourse = !props.onItemClick;
    const linkProps = {
        to: '',
        onTouchEnd: props.onItemClick
    };
    const renderItem = ({item, index}) => {
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
            <Link { ...linkProps } >
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
    const longListProps: LonglistProps = {
        data: props.data,
        total: props.total,
        onEndReached: props.onEndfresh,
        onRefresh: props.onRefresh,
        renderItem: props.renderItem || renderItem
    }
    return (
        <ScrollView style={styles.longListWrapper}>
            <Longlist ref={props.ref} { ...longListProps } />
        </ScrollView>
    )
}

export { LongListComponent, Props };
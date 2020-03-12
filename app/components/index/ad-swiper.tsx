import * as React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';

const {useState, useEffect} = React;

function AdSwiper(props) {
    const {height, width} = Dimensions.get('window')
    const style = {
        width,
        height: 200
    }
    return <Carousel
        style={style}
        bullets
        swipe
    >
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/6727c9f7fa9c6bd27bd5ba6c93748571.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/4b46f9e1c30a220f5a4e28ef239f9999.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/4040e9bc8ef03d61ffbf7b7fdbe00199.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/1546314a0033afe1b81bb55a13bdfd20.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/077b894a44f1cb52002bf15b39e4443b.jpeg'}} />
        </View>
    </Carousel>
}

export { AdSwiper };
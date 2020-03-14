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
        autoplay
    >
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/ba1e68c4d92f10ade695d810416cd5c1.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/6f752e75912e50b24837856fc129de82.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/ba1e68c4d92f10ade695d810416cd5c1.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/1d772e74d586aade27e0dd7ef4fb3e07.jpg'}} />
        </View>
        <View>
            <Image style={style} source={{uri: 'http://192.168.43.136:8888/server/static/img/16712d4ed1556f99d32ba2b669c3dbbc.jpg'}} />
        </View>
    </Carousel>
}

export { AdSwiper };
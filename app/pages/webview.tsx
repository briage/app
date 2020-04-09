import * as React from 'react';
import { WebView } from 'react-native-webview';
import { ScrollView, Dimensions } from 'react-native';

function NewPage(props) {
    const {height} = Dimensions.get('window')
    return (
        <ScrollView contentContainerStyle={{height}}>
            <WebView source={{uri: `http://192.168.43.136:8888/live`}} style={{height: '100%', width: '100%', backgroundColor: '#fff'}} />
        </ScrollView>
    )
}

export { NewPage };
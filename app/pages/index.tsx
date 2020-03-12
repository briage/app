import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { AdSwiper } from '../components/index/ad-swiper';
import { SearchBar } from '../components/index/search';

function Index(props) {
    return (
        <ScrollView>
            <SearchBar />
            <AdSwiper />
        </ScrollView>
    )
}

export { Index };
import * as React from 'react';
import { ScrollView, Dimensions,View, BackHandler } from 'react-native';
import { Router } from './components/core/router';
import { NativeRouter, Switch, Route, useLocation } from 'react-router-native';
import { Search } from './pages/search';
import { FooterBar } from './components/core/footerBar';
import { History } from './components/core/history';

const { useEffect } = React;

function PageLayout(props) {
    const {height} = Dimensions.get('window');
    return (
        <ScrollView>
            <NativeRouter>
                <Route path='/'>
                    <History />
                </Route>
                <Switch>
                    <Route path='/search' exact>
                        <Search />
                    </Route>
                    <Route path='/test' exact>

                    </Route>
                    <Route path='/course:courseId' exact>

                    </Route>
                    <Route path='/'>
                        <View style={{height}}>
                            <Router />
                            <FooterBar />
                        </View>
                    </Route>
                </Switch>
            </NativeRouter>
        </ScrollView>
    )
}

export { PageLayout };
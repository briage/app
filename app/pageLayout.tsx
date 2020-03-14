import * as React from 'react';
import { ScrollView, Dimensions,View, StatusBar, AsyncStorage } from 'react-native';
import { Router } from './components/core/router';
import { NativeRouter, Switch, Route, useLocation } from 'react-router-native';
import { Search } from './pages/search';
import { FooterBar } from './components/core/footerBar';
import { History } from './components/core/history';
import { Course } from './pages/course';
import { RegistorLogin } from './pages/registor-login';
import _ from 'lodash';

const { useReducer, useRef } = React;

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    newState[action.key] = action.value;
    return newState;
}

function PageLayout(props) {
    const {height} = Dimensions.get('window');
    const [state, dispatch] = useReducer(reducer, {
        isUpdate: false,
        visible: false
    });
    const goLogin = (isUpdate?: boolean) => {
        dispatch({key: 'visible', value: true})
        if (isUpdate !== undefined) {
            dispatch({key: 'isUpdate', value: isUpdate});
        }
    };
    const onClose = () => dispatch({key: 'visible', value: false});
    return (
        <ScrollView>
            <NativeRouter>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' ></StatusBar>
                <RegistorLogin goLogin={goLogin} onClose={onClose} isUpdate={state.isUpdate} visible={state.visible} />
                <Route path='/'>
                    <History />
                </Route>
                <Switch>
                    <Route path='/search/:type' exact>
                        <Search />
                    </Route>
                    <Route path='/test' exact>

                    </Route>
                    <Route path='/course/:courseId' exact>
                        <Course goLogin={goLogin} />
                    </Route>
                    <Route path='/'>
                        <View style={{height}}>
                            <Router goLogin={goLogin} />
                            <FooterBar />
                        </View>
                    </Route>
                </Switch>
            </NativeRouter>
        </ScrollView>
    )
}

export { PageLayout };
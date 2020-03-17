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

const { useReducer, useEffect } = React;

function reducer(state, action) {
    const newState = _.cloneDeep(state);
    newState[action.key] = action.value;
    return newState;
}

function PageLayout(props) {
    const {height} = Dimensions.get('window');
    const [state, dispatch] = useReducer(reducer, {
        isUpdate: false,
        visible: false,
        userInfo: {}
    });
    useEffect(() => {
        if (props.init) {
            AsyncStorage.getItem('userInfo')
            .then(value => {
                const userInfo = JSON.parse(value);
                if (userInfo.userId) {
                    userInfoChange(JSON.parse(value));
                } else {
                    userInfoChange({userId: '', selfset: {}, avatar: '', password: '', userName: '', sex: '', phone: ''});
                }
                props.onLock();
            })
        }
    })
    const goLogin = (isUpdate?: boolean) => {
        dispatch({key: 'visible', value: true})
        if (isUpdate !== undefined) {
            dispatch({key: 'isUpdate', value: isUpdate});
        }
    };
    const onClose = () => dispatch({key: 'visible', value: false});
    const userInfoChange = async (value) => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(value))
        await dispatch({key: 'userInfo', value});
        
    }
    return (
        <ScrollView>
            <NativeRouter>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' ></StatusBar>
                <RegistorLogin goLogin={goLogin} userInfo={state.userInfo} onClose={onClose} userInfoChange={userInfoChange} isUpdate={state.isUpdate} visible={state.visible} />
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
                        <Course goLogin={goLogin} userInfoChange={userInfoChange} userInfo={state.userInfo} />
                    </Route>
                    <Route path='/'>
                        <View style={{height}}>
                            <Router goLogin={goLogin} userInfo={state.userInfo} />
                            <FooterBar />
                        </View>
                    </Route>
                </Switch>
            </NativeRouter>
        </ScrollView>
    )
}

export { PageLayout };
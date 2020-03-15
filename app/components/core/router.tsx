import * as React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Index } from '../../pages/index';
import { Text, ScrollView } from 'react-native';

function Router(props) {
    const { goLogin, userInfo } = props;
    return (
        <>
            <Route path='/testpaper' exact>
                <ScrollView>
                <Text>找试卷</Text>
                </ScrollView>
            </Route>
            <Route path='/table' exact>
                <ScrollView>
                <Text>课程表</Text>
                </ScrollView>
                
            </Route>
            <Route path='/myInfo' exact>
                <ScrollView>
                <Text>个人中心</Text>
                </ScrollView>
                
            </Route>
            <Route path='/' exact>
                <Index userInfo={userInfo} goLogin={goLogin} />
            </Route>
        </>
    )
}

export { Router };
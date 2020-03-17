import * as React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Index } from '../../pages/index';
import { Text, ScrollView } from 'react-native';
import { MyInfo } from '../../pages/myInfo';
import { CourseTable } from '../../pages/course-table';

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
                <CourseTable userInfo={userInfo} />
            </Route>
            <Route path='/myInfo' exact>
                <MyInfo userInfo={userInfo} goLogin={goLogin} />
                
            </Route>
            <Route path='/' exact>
                <Index userInfo={userInfo} goLogin={goLogin} />
            </Route>
        </>
    )
}

export { Router };
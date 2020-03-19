import * as React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { Index } from '../../pages/index';
import { Text, ScrollView } from 'react-native';
import { MyInfo } from '../../pages/myInfo';
import { CourseTable } from '../../pages/course-table';
import { TestPaper } from '../../pages/testpaper';

function Router(props) {
    const { goLogin, userInfo, userInfoChange } = props;
    return (
        <>
            <Route path='/testpaper' exact>
                <TestPaper userInfo={userInfo} goLogin={goLogin} />
            </Route>
            <Route path='/table' exact>
                <CourseTable userInfo={userInfo} />
            </Route>
            <Route path='/myInfo' exact>
                <MyInfo userInfo={userInfo} goLogin={goLogin} userInfoChange={userInfoChange} />
            </Route>
            <Route path='/' exact>
                <Index userInfo={userInfo} goLogin={goLogin} />
            </Route>
        </>
    )
}

export { Router };
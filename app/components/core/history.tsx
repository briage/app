import * as React from 'react';
import { useLocation, useHistory } from 'react-router-native';
import { BackHandler } from 'react-native';

const { useEffect } = React;

function History(){
    const history = useHistory();
    const location = useLocation();
    function handleBack() {
        history.goBack();
        return true;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBack)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBack)
        }
    }, [])
    return<></>
}

export { History };
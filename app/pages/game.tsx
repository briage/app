import * as React from 'react';
import { View, Text } from 'react-native';
import { MultifySelect } from '../components/core/multifySelect';
import { word } from '../config/meta';
import _ from 'lodash';
import { styles } from '../style/game';
import Icon from 'react-native-vector-icons/AntDesign';
import { useHistory } from 'react-router-native';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function Game(props) {
    const [state, dispatch] = useReducer(reducer, {
        currentWord: '',
        rightNum: 0,
        answer: [],
        mean: '',
        value: {},
        error: false,
        sec: 20,
        stop: false,
        select: []
    });
    const history = useHistory();
    useEffect(() => {
        selectTest();
        time();
    }, [])
    const selectTest = () => {
        const len = word.length;
        let index = Math.floor(Math.random() *  len);
        const currentWord = word[index].word;
        let select = currentWord.split('');
        let selectLen = select.length;
        for (let i = 0; i < 4; i ++) {
            let value = '';
            let startIndex = Math.floor(Math.random() * selectLen);
            let endIndex = Math.floor(Math.random() * selectLen);
            value = select[startIndex];
            select[startIndex] = select[endIndex];
            select[endIndex] = value;
        }
        dispatch({key: 'select', value: select});
        dispatch({key: 'currentWord', value: word[index].word});
        dispatch({key: 'mean', value: word[index].mean});
    }
    const time = () => {
        let sec = 20;
        const timer = setInterval(() => {
            sec --
            if (!sec) {
                dispatch({key: 'stop', value: true});
                clearInterval(timer);
            }
            dispatch({key: 'sec', value: sec});
        }, 1000)
    }
    const handleChange = (value) => {
        dispatch({key: 'error', value: false});
        let answer = _.cloneDeep(state.answer);
        let objAnswer = _.cloneDeep(state.value);
        let rightNum = state.rightNum;
        const len = state.currentWord.length;
        let isFull = true;
        if (objAnswer[value]) {
            delete objAnswer[value];
            for (let i = 0; i < len; i ++) {
                if (answer[i] === value) {
                    answer[i] = '';
                    break;
                }
            }
        } else {
            for (let i = 0; i < len; i ++) {
                if (!answer[i]) {
                    answer[i] = value;
                    objAnswer[value] = true;
                    break;
                }
            }
        }
        for (let i = 0; i < len; i ++) {
            if (!answer[i]) {
                isFull = false;
            }
        }
        if (isFull) {
            if (answer.join('') === state.currentWord) {
                rightNum ++;
                selectTest();
                dispatch({key: 'rightNum', value: rightNum});
            } else {
                dispatch({key: 'error', value: true});
            }
            answer = [];
            objAnswer = {};
        }
        dispatch({key: 'answer', value: answer});
        dispatch({key: 'value', value: objAnswer});
    }
    const gameStart = () => {
        dispatch({key: 'sec', value: 20});
        dispatch({key: 'stop', value: false});
        time();
        selectTest();
    }
    return (
        state.stop ? 
        <View style={styles.stopWrapper}>
            <Text style={styles.header}>做对{state.rightNum}个</Text>
            <Text onPress={gameStart} style={styles.playBtn}>再次挑战</Text>
            <Text style={{marginTop: 400, color: 'red'}} onPress={history.goBack}>返回</Text>
        </View>
        :
        <View>
            <View style={styles.headerWrapper}>
                <Icon name='left' onPress={history.goBack} size={25} />
                <Text style={styles.header}>游戏</Text>
                <Text style={styles.time}>{state.sec}秒</Text>
            </View>
            <View style={styles.playWrapper}>
                <View style={styles.answerWrapper}>
                    {
                        state.select.map((item, index) => <Text style={{...styles.answerItem, ...state.error && {borderBottomColor: 'red'}}}>{state.answer[index]}</Text>)
                    }
                </View>
                <View style={styles.selectWrapper}>
                    <MultifySelect options={state.select} value={state.value} onChange={handleChange} />
                </View>
            </View>
            
        </View>
    )
}

export { Game };
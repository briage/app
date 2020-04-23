import * as React from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'beeshell';
import _ from 'lodash';
import { styles } from '../../style/inputForm';

export interface Props {
    key: string,
    value: string,
    onChange: (value) => void,
    type: 'text' | 'number' | 'email' | 'password',
    maxLength?: number,
    placeholder?: string,
    autoComplete?: string,
    secureTextEntry?: boolean,
    textContentType?: any
}

const { useState } = React;

function InputForm(props: Props) {
    const { onChange, type, maxLength } = props
    const [state, setState] = useState({
        checked: true
    })
    const handleChange = (value) => {
        const newState = _.cloneDeep(state);
        switch(type) {
            case 'number':
                newState.checked = +value && value.length <= maxLength;
                value = +value;
                break;
            case 'email':
                newState.checked = /^\w+@\w+(\.\w+)+/.test(value);
                break;
        }
        setState(newState);
        onChange(value);
    }
    return (
        <View key='input-form' style={styles.inputWrapper}>
            <TextInput style={{...styles.input, ...!state.checked && styles.errorBorder}} selectionColor='#38f' {...props} onChangeText={handleChange} />
        </View>
    )
}

export { InputForm };
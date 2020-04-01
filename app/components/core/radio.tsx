import * as React from 'react';
import {View, Text} from 'react-native';
import { styles } from '../../style/radio';
import _ from 'lodash';

interface optionsItem {
    label: string,
    value: string | number,
    result?: boolean
}

export interface Props {
    options: optionsItem[],
    onChange: (value) => void,
    value: string | number
}

function Radio(props: Props) {
    const { options, value, onChange } = props;
    return (
        <View key='radio-wrapper' style={styles.radioWrapper}>
            {
                options.map((item, index) => (
                    <View 
                        key={`label-wrapper${index}`} 
                        style={{...styles.labelWrapper, ..._.isBoolean(item.result) ? item.result ? styles.actionWrapperColor : {borderColor: 'red'} : value == item.value ? styles.actionWrapperColor : {}}}
                        onTouchEnd={onChange.bind(this, item.value)}
                    >
                        <Text key={`label${index}`} style={{...styles.label, ..._.isBoolean(item.result) ? item.result ? styles.actionLabelColor : {color: 'red'} : value == item.value ? styles.actionLabelColor : {}}} > {item.label} </Text>
                    </View>
                ))
            }
        </View>
    )
}

export { Radio };
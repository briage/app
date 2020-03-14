import * as React from 'react';
import {View, Text} from 'react-native';
import { styles } from '../../style/radio';

interface optionsItem {
    label: string,
    value: string | number
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
                        style={{...styles.labelWrapper, ...value === item.value ? styles.actionWrapperColor : {}}}
                        onTouchEnd={onChange.bind(this, item.value)}
                    >
                        <Text key={`label${index}`} style={{...styles.label, ...value === item.value ? styles.actionLabelColor : {}}} > {item.label} </Text>
                    </View>
                ))
            }
        </View>
    )
}

export { Radio };
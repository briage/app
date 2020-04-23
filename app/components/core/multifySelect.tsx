import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../style/multifySelect';

export interface Props {
    options: string[],
    value: {[key: string] : true},
    onChange: (value) => void
}

function MultifySelect(props: Props) {
    const { options, value, onChange } = props;
    return (
        <View key='multify-select-wrapper' style={styles.labelsWrapper}>
            {
                options.map((item, index) => {
                    return (
                        <View key={'labels' + index} style={value[item] ? {...styles.labelBtn, ...styles.labelBtnActive} : styles.labelBtn} onTouchEnd={onChange.bind(this, item)}>
                            <Text style={{...styles.label, ...value[item] && styles.activeLabel}} key='label'>{item}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export { MultifySelect };
import * as React from 'react';
import { View, Text } from 'react-native';
import { formControl_Map } from '../../config/formcontrol';

function FormControl(props) {
    return (
        <View>
            <Text>{props.label}</Text>
            {
                formControl_Map.filter(item => item.type.includes(props.type))[0].component(props)
            }
        </View>
    )
}
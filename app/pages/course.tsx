import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { useParams } from 'react-router-native';

function Course(props) {
    const { courseId } = useParams();
    return(
        <ScrollView>
            <Text>
                课题详情页
            </Text>
            <Text>
                {courseId}
            </Text>
        </ScrollView>
    )
}

export {Course};
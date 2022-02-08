import React from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

import { styles } from '../styles/ConversionInputStyles'

export const ConversionInput = ({ text, onButtonPress, ...props }) => {    
    if (props.editable === false) {
        props.backgroundColor = styles.containerDisabled.backgroundColor
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput 
                style={styles.input} 
                {...props}
            />
        </View>
    )
}
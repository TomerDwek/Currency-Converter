import React from "react";
import { TouchableOpacity, Text, View } from 'react-native';

import { styles } from '../styles/CurrencyListItemStyles';

export const CurrencyListItem = ({ text, rightIcon, onPress }) => {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
                {rightIcon}
        </TouchableOpacity>
    )
};

export const RowSeperator = () => <View style={styles.separator} />;
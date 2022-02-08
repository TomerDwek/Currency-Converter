import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, Text } from 'react-native';
import Constants from "expo-constants";

import { Logo } from "../components/Logo";
import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { ConversionRateText } from "../components/ConversionRateText";
import { Button } from "../components/Button";
import { ConversionContext } from "../util/ConversionContext";
import { styles } from "../styles/HomeScreenStyles";

const { manifest } = Constants;

export default ( { navigation }) => {
    const [value, setValue] = useState('100');
    const { 
        baseCurrency, 
        quoteCurrency, 
        swapCurrencies, 
        date, 
    } = useContext(ConversionContext)

    const conversionURL = `http://${manifest.debuggerHost.split(':').shift()}:3000/convert/${baseCurrency}/${quoteCurrency}`;
    const [conversionRate, setConversionRate] = useState([]);

    useEffect(() => {
        fetch(conversionURL)
          .then((response) => response.json())
          .catch((error) => alert(error))
          .then(json => {
            setConversionRate(json.rate)
          })
          .catch((error) => alert(error))
      }, [baseCurrency, quoteCurrency,])

    return (
        <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
                <Logo />
                <Text style={styles.textHeader}>Currency Convertor</Text>
                <ConversionInput
                    text={baseCurrency}
                    value={value}
                    onButtonPress={() => 
                        navigation.push('CurrencyList', { 
                            title: 'Base Currency', 
                            isBaseCurrency: true
                        })
                    }
                    onChangeText={text => setValue(text)}
                    keyboardType="numeric"
                />
                <ConversionInput
                    text={quoteCurrency}
                    value={
                        value && `${(parseFloat(value) * conversionRate)}`
                    }
                    onButtonPress={() => 
                        navigation.push('CurrencyList', { 
                            title: 'Quote Currency', 
                            isBaseCurrency: false
                        })
                    }
                    editable={false}
                />
                <ConversionRateText
                    baseCurrency={baseCurrency}
                    quoteCurrency={quoteCurrency}
                    conversionRate={conversionRate}
                    date={date}
                />
                <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
        </View>
    )
}
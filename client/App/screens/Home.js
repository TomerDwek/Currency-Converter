import React, { useState, useContext, useEffect } from "react";
import { 
    View, 
    StyleSheet, 
    StatusBar, 
    Image, 
    Dimensions, 
    Text, 
    ActivityIndicator
} from 'react-native';
import { format } from 'date-fns';
import Constants from "expo-constants";

import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import { ConversionContext } from "../util/ConversionContext";

const { manifest } = Constants;
const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        paddingTop: screen.height * 0.2
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        position: "absolute",
        width: screen.width * 0.25,
        height: screen.width * 0.25
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.width * 0.45
    },
    textHeader: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
        textAlign: "center"
    },
    text: {
        color: colors.white,
        fontSize: 13,
        textAlign: "center"
    },
    inputContainer: {
        marginBottom: 10,
    },
        header: {
        alignItems: 'flex-end',
        marginHorizontal: 20,
    },
})

export default ( { navigation }) => {
    const [value, setValue] = useState('100');
    // const [isLoading, setLoading] = useState(true);

    const { 
        baseCurrency, 
        quoteCurrency, 
        swapCurrencies, 
        date, 
        isLoading
    } = useContext(ConversionContext)

    const convertionURL = `http://${manifest.debuggerHost.split(':').shift()}:3000/convert/${baseCurrency}/${quoteCurrency}`;
    const [conversionRate, setConversionRate] = useState([]);

    fetch(convertionURL)
    .then((response) => response.json())
    .then(json => setConversionRate(json.rate))
    .catch((error) => alert(error))
    // .finally(setLoading(false));

    // useEffect(() => {
    //     fetch(convertionURL)
    //       .then((response) => response.json())
    //       .catch((error) => alert(error))
    //       .then(json => {
    //           console.log(json)
    //         setConversionRate(json.rate)
    //       })
    //       .catch((error) => alert(error))
    //   }, [])

    return (
        <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
                
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../assets/images/background.png')} 
                        style={styles.logoBackground}
                        resizeMode="contain"
                    />
                    <Image 
                        source={require('../assets/images/converter.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.textHeader}>Currency Convertor</Text>

                { isLoading ?  (
                    <ActivityIndicator color={colors.white} size="large" />
                ) : (
                    <>
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
            
                        <Text style={styles.text}>
                            {`1 ${baseCurrency} = ${Number(conversionRate).toFixed(4)} ${quoteCurrency} as of ${
                                date && format(new Date(date), 'MMMM do, yyyy')
                            }.`}
                        </Text>

                        <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
                    </>  
                )}

        </View>
    )
}
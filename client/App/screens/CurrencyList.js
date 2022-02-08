import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Constants from "expo-constants";

import colors from '../constants/colors';
import { CurrencyListItem, RowSeperator } from "../components/CurrencyListItem";
import { ConversionContext } from '../util/ConversionContext';
import { styles } from '../styles/CurrencyListStyles';

const { manifest } = Constants;
const currenciesURL = `http://${manifest.debuggerHost.split(':').shift()}:3000/currencies`;

export default ({ navigation, route = {} }) => {
  const [currencies, setCurrencies] = useState([]);

  const params = route.params || {};
  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } = useContext(ConversionContext);

  const renderItem = ({item}) => {
    let selected = false;
    if (params.isBaseCurrency && item.isoCode === baseCurrency) {
      selected = true;
    } else if (!params.isBaseCurrency && item.isoCode === quoteCurrency) {
      selected = true
    }
    return (
      <CurrencyListItem 
        text={item.isoCode} 
        onPress={() => {
          if (params.isBaseCurrency) {
            setBaseCurrency(item.isoCode)
          } else {
            setQuoteCurrency(item.isoCode)
          }
          navigation.pop()
        }} 
        rightIcon={
          selected && (
          <View style={styles.icon}>
            <Entypo name="check" size={20} color={colors.white} />
          </View>
          )
        }
      />
    );
  }

  useEffect(() => {
    fetch(currenciesURL)
    .then((response) => response.json())
    .then(json => {
      setCurrencies(json)})
    .catch((error) => alert(error))
  },[])

  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList 
        data={currencies}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <RowSeperator />}
      />
    </View>
  )
}
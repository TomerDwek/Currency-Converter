import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Constants from "expo-constants";

import colors from '../constants/colors';
import { RowItem, RowSeperator } from "../components/RowItem";
import { ConversionContext } from '../util/ConversionContext';

const { manifest } = Constants;
const currenciesURL = `http://${manifest.debuggerHost.split(':').shift()}:3000/currencies`;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    backgroundColor: colors.blue,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ({ navigation, route = {} }) => {
  const [isLoading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  const params = route.params || {};
  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } = useContext(ConversionContext);

  useEffect(() => {
    fetch(currenciesURL)
    .then((response) => response.json())
    .then(json => {
      setCurrencies(json)})
    .catch((error) => alert(error))
    .finally(setLoading(false));
  },[])

  return (
    isLoading ?  (
      <ActivityIndicator color={colors.white} size="large" />
    ) : (
      <View style={{ backgroundColor: colors.white }}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <FlatList 
          data={currencies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let selected = false;
            if (params.isBaseCurrency && item.isoCode === baseCurrency) {
              selected = true;
            } else if (!params.isBaseCurrency && item.isoCode === quoteCurrency) {
              selected = true
            }

            return (
              <RowItem 
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
          }}
          ItemSeparatorComponent={() => <RowSeperator />}
        />
      </View>
    )
  )
}
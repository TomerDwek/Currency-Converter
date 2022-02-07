import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, FlatList, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../constants/colors';
import currencies from "../data/currencies.json"
import { RowItem, RowSeperator } from "../components/RowItem";
import { ConversionContext } from '../util/ConversionContext';

const currenciesURL = "http://172.31.112.1:3000/currencies";

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
  const [data, setData] = useState([]);

  const params = route.params || {};
  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } = useContext(ConversionContext);

  useEffect(() => {
    fetch(currenciesURL)
    .then((response) => response.json())
    .catch((error) => alert(error))
    .then(json => {
      console.log(json)
      setData(json)})
    .catch((error) => alert(error))
    .finally(setLoading(false));
  },[])

  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList 
        data={data}
        keyExtractor={(_id, index) => _id}
        renderItem={({ item }) => {
          let selected = false;
          if (params.isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!params.isBaseCurrency && item === quoteCurrency) {
            selected = true
          }

          return (
            <RowItem 
              text={item.isoCode} 
              onPress={() => {
                if (params.isBaseCurrency) {
                  setBaseCurrency(item)
                } else {
                  setQuoteCurrency(item)
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
  );
}
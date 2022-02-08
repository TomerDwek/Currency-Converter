import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import CurrencyList from './screens/CurrencyList';
import { ConversionContextProvider } from './util/ConversionContext';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator >
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen 
      name="CurrencyList" 
      component={CurrencyList} 
      options={({ route }) => ({
        title: route.params && route.params.title,
      })}
    />
  </MainStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ConversionContextProvider>
      <MainStackScreen />
    </ConversionContextProvider>
  </NavigationContainer>
);
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CityScreen } from './CityScreen';
import { LatLongScreen } from './LatLongScreen';
import { ButtomTabBar } from './ButtomTabBar';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <ButtomTabBar {...props} />} initialRouteName={"City Mode"}>
          <Tab.Screen name="City Mode" options={{
              tabBarLabel: "City Mode", 
              headerStyle: {
                backgroundColor: '#1480cc',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }}} 
              component={CityScreen} 
              key="cityMode" />
          <Tab.Screen name="Lat-Long Mode" options={{
            tabBarLabel: "Lat-Long Mode",
            headerStyle: {
              backgroundColor: '#1480cc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }}}
            component={LatLongScreen} 
            key="latLongMode" />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    );
  }
}
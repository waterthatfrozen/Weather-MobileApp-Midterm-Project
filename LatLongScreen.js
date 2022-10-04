import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import * as Device from 'expo-device';

import API from './api';
import { WeatherChart } from './WeatherChart';
import { styles } from './Stylesheet';


export class LatLongScreen extends Component{
    constructor(props){
      super(props);
      this.state = {
        currentLocation: null,
        errorMessage: null,
        appMode: 'latlong',
        weatherData: null,
        fetching: true,
        imageList: {
          sunny: require('./img/sunny.png'),
          cloudy: require('./img/cloudy.png'),
          rainy: require('./img/rainy.png'),
          windy: require('./img/windy.png')
        }
      }
    }
  
    bangkokTimeConversion(timeString){
      let currentDateTime = new Date();
      let currentHour = timeString.split(" ");
      currentHour = currentHour[1] === "AM" ? parseInt(currentHour[0]) : parseInt(currentHour[0]) + 12;
      currentDateTime.setUTCMilliseconds(0);
      currentDateTime.setUTCSeconds(0);
      currentDateTime.setUTCMinutes(0);
      currentDateTime.setUTCHours(currentHour);
      return currentDateTime.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'});
    }
  
    async callAPI(){
      API({lat: this.state.currentLocation.lat, lon: this.state.currentLocation.lon ,mode: this.state.appMode}).then(data => {
        if(!data.detail){
          let temperature = [];
          let timestamp = [];
          let weatherType = [];
          data.forEach((item, index) => {
            temperature.push(item.temperature.toFixed(2));
            timestamp.push(this.bangkokTimeConversion(item.hour));
            weatherType.push(this.state.imageList[item.weather]);
          });
          this.setState({
            weatherData: {
              timestamp: timestamp,
              temperature: temperature,
              weatherType: weatherType
            }, 
            fetching: false
          });
        }else{
          throw new Error(data.detail);
        }
      }).catch(error => {
        this.setState({errorMessage: error.message, fetching: false});
        Toast.show({
          type: 'error',
          text1: 'Error while fetching weather data',
          text2: this.state.errorMessage,
          autoHide: false,
          position: 'bottom',
          visibilityTime: 4000
        });
      });
    }
  
    componentDidMount() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        this.setState({
          errorMessage: `Oops, this will not work on Sketch in an Android emulator. 
          Try it on your device!`,
        });
      } else { this._getLocationAsync(); }
    }
  
    async _getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        lat: location.coords.latitude.toFixed(4),
        lon: location.coords.longitude.toFixed(4),
      };
      this.setState({currentLocation: currentLocation});
      this.callAPI();
    }
  
    displayChart(){
      if(this.state.errorMessage){
        return(
          <Text>{this.state.errorMessage}</Text>
        );
      }else if(this.state.fetching){
        return(
          <Text>Fetching Graph Data...</Text>
        );
      }else{
        return (
          <WeatherChart
            labels={this.state.weatherData.timestamp}
            data={this.state.weatherData.temperature}
            icons={this.state.weatherData.weatherType}
            style={styles.chartView}
          />
        );
      }
    }
  
    render(){
      return (
        <View style={styles.container}>
          <Text style={styles.textHeading}>3-Hours Weather for Current Location</Text>
          <View style={{alignItems: 'center'}}>
            {this.displayChart()}
          </View>
          <View>
            <Text style={styles.textHeading}>Current Location</Text>
            <Text>{this.state.currentLocation ? `Latitude: ${this.state.currentLocation.lat} / Longitude: ${this.state.currentLocation.lon}` : "Fetching Current Location..."}</Text>
          </View>
          <Toast/>
        </View>
      );
    }
  }
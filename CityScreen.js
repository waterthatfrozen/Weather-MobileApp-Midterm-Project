import React,{Component} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-toast-message';

import { CityButton } from './CityButton';
import { WeatherChart } from './WeatherChart';
import API from './api';
import { styles } from './Stylesheet';

export class CityScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        appMode: 'cityname',
        citiesList: [
          {code: 'BKK', name: 'Bangkok'},
          {code: 'CNX', name: 'Chiang Mai'},
          {code: 'HKT', name: 'Phuket'},
          {code: 'KKC', name: 'Khon Kaen'}
        ],
        currentCity: {code: 'BKK', name: 'Bangkok'},
        weatherData: null,
        fetching: true,
        errorMessage: null,
        imageList: {
          sunny: require('./img/sunny.png'),
          cloudy: require('./img/cloudy.png'),
          rainy: require('./img/rainy.png'),
          windy: require('./img/windy.png')
        }
      }
      this.callAPI();
      this.handleCityButtonPress = this.handleCityButtonPress.bind(this);
    }
  
    async callAPI(){
      API({code: this.state.currentCity.code, mode: this.state.appMode}).then(data => {
        if(!data.detail){
          let temperature = [];
          let timestamp = [];
          let weatherType = [];
          data.forEach((item, index) => {
            temperature.push(item.temperature.toFixed(2));
            timestamp.push(item.date.split("-").reverse().splice(0,2).join("/"));
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
  
    handleCityButtonPress(cityCode){
      let newCity = this.state.citiesList.find(city => city.code === cityCode);
      this.setState({currentCity: newCity, fetching: true, weatherData: null, errorMessage: null});
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
        <View style={[styles.container]}>
          <Text style={styles.textHeading}>Daily Weather for {this.state.currentCity.name}</Text>
          <View style={{alignItems: 'center'}}>
            {this.displayChart()}
          </View>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.state.citiesList.map((city, index) => {
                return(
                  <CityButton 
                    cityCode={city.code} 
                    cityName={city.name} 
                    key={index} 
                    onPress={() => {this.handleCityButtonPress(city.code);}} 
                    disabled={this.state.fetching || this.state.currentCity.code === city.code}
                    focused={this.state.currentCity.code === city.code}
                    style={styles.cityButton} />
                );
              })}
            </View>
          </View>
          <Toast/>
        </View>
      );
    }
  }
  
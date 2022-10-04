import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export class CityButton extends Component {
    render(){
        return(
        <TouchableOpacity
            onPress={this.props.onPress} 
            disabled={this.props.disabled}
            style={this.props.focused ? styles.cityButtonFocused : styles.cityButton}>
            <Text style={this.props.focused ? styles.cityButtonTextFocused : styles.cityButtonText}>{this.props.cityCode}</Text>
        </TouchableOpacity> 
        );
    }
}

const styles = StyleSheet.create({
    cityButton:{ 
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1480cc',
        borderRadius: 5,
    },
    cityButtonText:{
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'normal'
    },
    cityButtonFocused:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#c99e0e',
        borderRadius: 5,
    },
    cityButtonTextFocused:{
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
import React, {Component} from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, Text, View, Image } from 'react-native';

let {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
    strokeWidth: 3,
    useShadowColorFromDataset: false,
    decimalPlaces: 2,
    propsForDots: {
      r: "6"
    }
}

export class WeatherChart extends Component {
    render(){
        return (
            <LineChart
                data={{
                labels: this.props.labels,
                datasets: [{
                    data: this.props.data,
                    color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
                    strokeWidth: 2}]
                }}
                chartConfig={chartConfig}
                style={this.props.style}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT*2/3}
                segments={5}
                yAxisSuffix="&deg;C"
                renderDotContent={({x, y, index}) => {
                    return (
                        <View>
                            <Text style={{
                                fontSize: 12, 
                                position: 'absolute', 
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center', 
                                top: y - 25, 
                                left: x}}>{this.props.data[index]}</Text>
                            <Image key={index} style={{
                                width:20,
                                height:20,
                                position: 'absolute',
                                justifyContent: 'center',
                                alignItems: 'center', 
                                top: SCREEN_HEIGHT*2/3 - 75, 
                                left: x - 10}} source={this.props.icons[index]}/>
                        </View>
                    )
                }}
            bezier
        />
    )}
}
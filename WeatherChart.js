import React, {Component} from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, Text, View, Image } from 'react-native';

let {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
    strokeWidth: 3,
    useShadowColorFromDataset: false,
    decimalPlaces: 2,
    barPercentage: 0.9,
    propsForHorizontalLabels: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000'
    },
}

export class WeatherChart extends Component {
    render(){
        return (
        <View style={{flexDirection: 'column'}}>
            <View>
                <BarChart
                    data={{
                    labels: this.props.labels,
                    datasets: [{
                        data: this.props.data,
                        color: (opacity = 1) => `rgba(20, 128, 204, ${opacity})`,
                        strokeWidth: 2}]
                    }}
                    chartConfig={chartConfig}
                    style={{...this.props.style, marginBottom: -75}}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT*2/3}
                    segments={5}
                    yAxisSuffix="&deg;C"
                />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 82}}>
                {this.props.icons.map((icon, index) => {
                    let numberOfIcons = this.props.icons.length;
                    let marginRight = index !== numberOfIcons - 1 ? ((SCREEN_WIDTH - 82 - 20*(numberOfIcons - 1)) / numberOfIcons): 0;
                    return (
                        <Image style={{width:20, height:20, marginRight: marginRight}} source={icon} key={index}/>
                    )
                })}
            </View>
        </View>
    )}
}
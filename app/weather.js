import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    Button, 
    Dimensions, 
    ScrollView
} from "react-native";
import weatherCondition from './utilities/weatherCondition';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Weather extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        // this.props.onRef(this)
        console.log(`from weather ${this.props.hourly}`)
    }
    
    // <Button 
    //     onPress={() => this.props.reload()}
    //     title="Reload"      
    // />

    renderHourly = () => {
        return this.props.hourly.map((element) => {
            let timeOfDay = null
            let time = parseInt(element.time)
            // alert(time)
            // (time >= 13) ? timeOfDay = 'pm' : timeOfDay = 'am'
            if (time >= 13 ) {
                timeOfDay = 'pm'
            } else {
                timeofDay = 'am'
            }
            return(
                <View key={element.id} style={styles.hourlyItem}>
                    <Text style={styles.hourlyItemText}>{element.time}{timeOfDay}</Text>
                    <MaterialCommunityIcons size={75} name="weather-sunny" color={'#fff'} />
                    <Text style={styles.hourlyItemText}>{element.weather}°C</Text>
                </View> 
            )
        })
    }

    render() {
        const { condition } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.locationRow}>            
                    <MaterialCommunityIcons size={75} name="weather-sunny" color={'#fff'} />
                    <Text style={styles.cityText}>{this.props.city}</Text>
                </View>
               
                <View style={styles.tempRow}>
                    <Text style={styles.tempText}>{this.props.temp}°C</Text>
                </View>

                <View style={styles.hourlyRow}>
                    <ScrollView horizontal={true} style={styles.hourlyScroll}>
                        {this.renderHourly()}


                    </ScrollView>
                </View>

                <View style={styles.descriptionRow}>
                    <Text style={styles.descMain}>{condition}</Text>
                    <Text style={styles.descSub}>{weatherCondition[condition].subtitle}</Text>
                </View>
                
            </View>
        );
    }
}
export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: '#f7b733',
    },
    locationRow: {
        flex: 1,
        paddingTop: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cityText: {
        fontSize: 28,
        color:'#fff'
    },
    tempRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 60,
        color:'#fff'
    },
    hourlyRow: {
        paddingTop: 80,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    hourlyScroll: {
        flexDirection: 'row',
    },
    hourlyItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    hourlyItemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hourlyText: {
        fontSize: 28,
        color:'#fff'
    },
    descriptionRow: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    descMain: {
        fontSize: 30,
        color:'#fff' 
    },
    descSub: {
        fontSize: 22,
        color: '#fff'
    }

});
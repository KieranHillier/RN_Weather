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
        this.condition = weatherCondition[this.props.condition]
    }

    componentDidMount() {
        // this.props.onRef(this)
        console.log(`from weather ${this.props.hourly}`)
        console.log(this.condition)
    }
    
    // <Button 
    //     onPress={() => this.props.reload()}
    //     title="Reload"      
    // />

    renderHourly = () => {
        return this.props.hourly.map((element) => {
            let timeOfDay = ''
            let time = element.time
            // console.log(parseInt(element.time))
            // alert(time)
            // (time >= 13) ? time += 'pm' : time += 'am';
            if (time >= 13) {
                time += ':00 pm'
                console.log('pm')
            } else {
                time += ':00 am'
                console.log('am')
            }
            return(
                <View key={element.id} style={styles.hourlyItem}>
                    <Text style={styles.hourlyItemText}>{time}</Text>
                    <MaterialCommunityIcons size={64} name={weatherCondition[element.icon].icon} color={'#fff'} />
                    <Text style={styles.hourlyItemText}>{element.weather}°</Text>
                </View> 
            )
        })
    }

    render() {
        const { condition } = this.props

        return (
            <View style={{flex:1, backgroundColor: weatherCondition[condition].color}}>
                <Text style={styles.cityText}>{this.props.city}</Text>
                <View style={styles.locationRow}>            
                    <MaterialCommunityIcons size={158} name={weatherCondition[condition].icon} color={'#fff'} />
                    
                </View>
               
                <View style={styles.tempRow}>
                    <Text style={styles.tempText}>{this.props.temp}°</Text>
                </View>

                <View style={styles.hourlyRow}>
                    <ScrollView horizontal={true} style={styles.hourlyScroll}>
                        {this.renderHourly()}


                    </ScrollView>
                </View>

                <View style={styles.descriptionRow}>
                    <Text style={styles.descMain}>{weatherCondition[condition].title}</Text>
                    <Text style={styles.descSub}>{weatherCondition[condition].subtitle}</Text>
                </View>
                
            </View>
        );
    }
}
export default Weather;

const styles = StyleSheet.create({
    
    locationRow: {
        flex: 1,
        paddingTop: 65,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cityText: {
        fontSize: 20,
        color:'#fff',
        padding: 5,
        paddingLeft: 10,
        fontWeight: '200',
    },
    tempRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 64,
        marginTop: 25,
        color:'#fff'
    },
    hourlyRow: {
        paddingTop: 65,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    hourlyScroll: {
        flexDirection: 'row',
    },
    hourlyItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
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
        paddingLeft: 10,
        marginBottom: 20
    },
    descMain: {
        fontSize: 36,
        color:'#fff',
        fontWeight: '900', 
    },
    descSub: {
        fontSize: 24,
        color: '#fff'
    }

});
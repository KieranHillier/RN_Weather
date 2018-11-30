import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native"
import weatherCondition from './utilities/weatherCondition'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.condition = weatherCondition[this.props.condition]
    this.state = {
      refreshing: false
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    this.props.reload
    this.setState({refreshing: false})
  }

  renderHourly = () => {
    return this.props.hourly.map((element) => {

      let time = element.time

      time >= 13 ? time += ':00 pm' : time += ':00 am'

      return (
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
    const { refreshing } = this.state

    return (
      <ScrollView 
        contentContainerStyle={{ flex: 1, backgroundColor: weatherCondition[condition].color }} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.cityText]}>{this.props.city}</Text>
          <TouchableOpacity onPress={this.props.reload}>
            <MaterialCommunityIcons style={styles.reloadText} size={35} name={'sync'} color={'#fff'} />
          </TouchableOpacity>
        </View>

        <View style={styles.locationRow}>
          <MaterialCommunityIcons size={200} name={weatherCondition[condition].icon} color={'#fff'} />
        </View>

        <View style={styles.tempRow}>
          <Text style={styles.tempText}>{parseInt(this.props.temp)}°</Text>
        </View>

        <View style={styles.hourlyRow}>
          <Text style={styles.scrollText}>Tomorrow</Text>
          <ScrollView overScrollMode={'never'} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.hourlyScroll}>
            {this.renderHourly()}
          </ScrollView>
        </View>

        <View style={styles.descriptionRow}>
          <Text style={styles.descMain}>{weatherCondition[condition].title}</Text>
          <Text style={styles.descSub}>{weatherCondition[condition].subtitle}</Text>
        </View>

      </ScrollView>
    );
  }
}

export default Weather;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationRow: {
    flex: 1,
    paddingTop: 95,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 26,
    color: '#fff',
    padding: 5,
  },
  cityText: {
    paddingLeft: 10,
  },
  reloadText: {
    paddingRight: 10,
    marginTop: 5
  },
  tempRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 85,
    marginTop: 50,
    color: '#fff',
    marginLeft: 15,
  },
  hourlyRow: {
    paddingTop: 45,
    paddingLeft: 15,
    paddingRight: 15,
  },
  scrollText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5
  },
  hourlyScroll: {
    flexDirection: 'row',
  },
  hourlyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  hourlyItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourlyText: {
    fontSize: 28,
    color: '#fff'
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
    color: '#fff',
    fontWeight: '900',
  },
  descSub: {
    fontSize: 26,
    color: '#fff'
  }

});
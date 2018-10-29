import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Weather from './app/weather';
import Loading from './app/loading';
// import APIKEY from './app/utilities/APIKey';

type Props = {};
class App extends Component<Props> {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    city: null,
    APIKEY: '5acebba7e04d7642b127e14afe3aecb3'
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: "There was a problem gathering the weather data. Please check internet connection and try again!"
        })
        alert("shit")
      }
    )
  }

  getWeather(latitude, longitude) {
    fetch (
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${this.state.APIKEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          city: json.name,
          isLoading: false
        })
      });
    fetch (
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${this.state.APIKEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json.list[0].dt_txt)
        const hourlyWeather = []
        json.list.map((x) => {
          const hourlyInput = {
            weather: x.weather[0].main,
            time: x.dt_txt
          }
          hourlyWeather.push(hourlyInput)
          console.log(x.weather[0].main)
          console.log(x.dt_txt)
        })
        //made an array of all the temperatures
        console.log(hourlyWeather)
      });
    
  }

  reload = () => {
    //MAKE THE BELOW INTO FUNCTION TO REMOVE REPITION
    alert(111)
    this.setState({
      isLoading: true
    })
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: "There was a problem gathering the weather data. Please check internet connection and try again!"
        })
        alert("shit")
      }
    )
  }

  render() {
    const { isLoading, temperature, weatherCondition, city } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <Weather temp={temperature} city={city} condition={weatherCondition} reload={this.reload}/>
        )}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

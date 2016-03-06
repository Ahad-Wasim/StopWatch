/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

class Stopwatch extends Component {
  constructor(){
    super()
    this.state = {
      timeElapsed : null,
      running: false,
      startTime: null
    };
  }
  handleStartPress(){

    if(this.state.running){
      clearInterval(this.interval)
      this.setState({running: false})
      return;  
    }
    

    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      })
    }, 30);

  }

  startStopButton(){

    var style = this.state.running ? styles.stopButton : styles.startButton ;

    return (
      <TouchableHighlight 
        underlayColor='gray' 
        onPress={this.handleStartPress.bind(this)}
        style={[styles.button, style]}
      >

        <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    );
  }

  handleLapPress(){
    const lap = this.state.timeElapsed;
    
    this.setState({
      startTime: new Date()
    })
  }

  lapButton(){
    return (
      <TouchableHighlight 
        style={styles.button}
        underlayColor="gray"
        onPress={this.handleLapPress.bind(this)}
      >
        <Text>Lap</Text>
      </TouchableHighlight>
    );
  }

  border(color){
    return {
      borderColor: color,
      borderWidth:4
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={[styles.header]}>
          
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>

          <View style={[styles.buttonWrapper]}>
            {this.startStopButton.call(this)}
            {this.lapButton.call(this)}
          </View>
        </View>


        <View style={[styles.footer]}>
          <Text>
            I am a list of Laps
          </Text>
        </View>
        


      </View>
    );
  }
}
/*fill the entire screen*/
/* Align items is horizontal. Stretch is telling all child elements of this parent need to take up the entire screens width.*/

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },  
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper:{
    flex:5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonWrapper:{
    flex: 3,
    flexDirection: 'row', // Stack all child components sideways
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height:100,
    width:100,
    borderRadius:50,
    // Centering the Text
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#cc0000'
  }
});

AppRegistry.registerComponent('stopwatch', () => Stopwatch);

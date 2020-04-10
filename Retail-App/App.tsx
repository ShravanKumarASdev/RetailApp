import React,{ Component }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import NavigatorComponent from './CustomComponents/NavigatorComponent';

export default class App extends Component {
  render(){
    return (
      // <View style={styles.container}>
      //   <Text>This is our Ratail app!</Text>
      // </View>
      <NavigatorComponent> </NavigatorComponent>
    );
  }
   
 }


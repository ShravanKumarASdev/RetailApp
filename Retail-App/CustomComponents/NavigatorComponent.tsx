import React,{ Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LandingView from './LandingComponent';
import HomeComponent from './HomeComponent';

export default class NavigatorComponent extends Component {

 HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

 NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

LandingScreen({ navigation }) {
  return (<LandingView></LandingView>);
} 

CategoryScreen({ navigation }) {
  return (<HomeComponent></HomeComponent>);
} 

render(){
    const Drawer = createDrawerNavigator();
    return(
        <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={this.HomeScreen} />
        <Drawer.Screen name="Notifications" component={this.NotificationsScreen} />
        <Drawer.Screen name="Landing Page" component={this.LandingScreen} />
        <Drawer.Screen name="Home Page" component={this.CategoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );  
}
}
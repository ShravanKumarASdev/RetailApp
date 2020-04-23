import React,{ Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from './LoginComponent';
import RegisterUser from './Register';

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

LoginScreen({ navigation }) {
  return (
   <LoginView/>
  );
}
RegisterScreen({ navigation }) {
  return (
   <RegisterUser/>
  );
}


render(){
    const Drawer = createDrawerNavigator();
    return(
        <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={this.LoginScreen} />
        <Drawer.Screen name="Notifications" component={this.NotificationsScreen} />
        <Drawer.Screen name="SignOut" component={this.LoginScreen} />
        <Drawer.Screen name="Register" component={this.RegisterScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );  
}
}
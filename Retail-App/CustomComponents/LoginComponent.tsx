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
export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }
  onClickListener = (viewId) => {
    //Calling get api endpoint
    fetch('http://192.168.1.5:3001/Users').then((response) => {return response.json()})
    .then(response=>alert(JSON.stringify(response)))
    .catch((error) => {
            console.error(error);
          });

    //Calling Post api endpoint
    fetch("http://192.168.1.5:3001/Users/Authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userNm :"New User",
        userPwd: "TempPwd"
      })
    })
      .then(response => response.json())
      .then(response => {
        alert('hi'+JSON.stringify(response));
      })
      .catch(error => alert("Error " + error));
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Move tile to a different component */}
        <TouchableOpacity style={styles.card}>
            <Image style={styles.cardImage} source={{uri:'https://tse4.mm.bing.net/th?id=OIP.GEFF6V-bR5WM7mn5xTO0tAHaHa&pid=Api&P=0&w=300&h=300'}}/>
            <Text style={styles.cardText}>Product Name</Text>
            <Text style={styles.cardText}>Rating</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => {this.setState({email}),(()=>{console.log('mona'+this.state['email'])})();}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() =>{ console.log(this.state['email']);this.onClickListener('login')}}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  card:{
    backgroundColor:'#fff',
    marginBottom:10,
    marginLeft:'2%',
    width:'45%',
    height:'30%',
    shadowColor:'#000',
    borderRadius:5,
    shadowOpacity:0.2,
    shadowRadius:3,
    shadowOffset:{
      width:3,
      height:3
    }
  },
  cardImage:{
    marginTop:'1%',
    width:'100%',
    height:'80%',
    resizeMode:'cover'
  },
  cardText:{
    color: '#a9a9a9',
    fontSize:12,
    height:'10%',
    paddingLeft:15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
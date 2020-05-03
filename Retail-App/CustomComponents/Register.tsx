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

export default class RegisterUser extends Component{


    onClickListener = (viewId) => {
        //Calling get api endpoint
    fetch('http://192.168.0.103:3001/Users/Insert',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({
          userNm : this.state.Username,
          userPwd: this.state.password,
          emailAddrss: this.state.Email,
          mobNum: this.state.MobileNumber

        })
      })
        .then(response => {return response.json()})
        .then(response => {
          
          alert("hi"+JSON.stringify(response));
        })
        .catch(error => alert("Error " + error));
      alert("Button  register "+ this.state.Username);
    }
    render() {
        return (
          <View style={styles.container}>
    
           
           
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Username or Mobile Number"
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  onChangeText={(Username) => {this.setState({Username})}}/>
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Firstname"
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  onChangeText={(Firstname) => {this.setState({Firstname})}}/>
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Lastname"
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  onChangeText={(Lastname) => {this.setState({Lastname})}}/>
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Email (Optional)"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(Email) => {this.setState({Email})}}/>
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  underlineColorAndroid='transparent'
                  onChangeText={(MobileNumber) => {this.setState({MobileNumber})}}/>
            </View>
            
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}/>
            </View>


            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(cpassword) => this.setState({cpassword})}/>
            </View>
    
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() =>{this.onClickListener('register')}}>
              <Text style={styles.loginText}>Register</Text>
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
import React, { Component } from 'react';
import { View, ScrollView,Alert,TouchableOpacity, Image,ImageBackground, StyleSheet, Dimensions, Text, FlatList  } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";


export class TileDetailComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            data:props.data
        }
    }
  render() {
        const { data } = this.state;
        return(
            <View style={styles.tileTextContainer}>
                <Text style={styles.tileTitle}>
                    {data.Name}{'asdadas'}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        borderTopWidth:30,
        paddingLeft:5,
        height:"100%",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightyellow'
    },
    tileTextContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tileTitle:{
        color: '#494949',
        fontFamily:'sans-serif-medium',
        fontStyle:'italic', 
        fontWeight: '200', 
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:4
    }
});

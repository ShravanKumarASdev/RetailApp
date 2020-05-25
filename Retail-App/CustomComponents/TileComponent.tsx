import React, { Component } from 'react';
import { View, ScrollView,Alert,TouchableOpacity, Image,ImageBackground, StyleSheet, Dimensions, Text, FlatList  } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { TileDetailComponent } from './TileDetailComponent';

export class TileComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            data:props.data
        }
    }

    incrementCount(count){
        let tempData=this.state.data;
        tempData.Count=count+1;
        this.setState({
            data:tempData
        });
    }
    decrementCount(count){
        let tempData=this.state.data;
        if(count>=1){
            tempData.Count=count-1;
            this.setState({
                data:tempData
            });
        }
    }
  render() {
    const { data } = this.state;
      return(
        <View elevation={5} style={styles.tile}>
            <Image
                source={{
                uri: `data:image/gif;base64,${data.Image}`
                }}
                style={styles.tileImage}
            />
            
            <View style={{ flexDirection: 'row',alignSelf:'center' }}>
                <TouchableOpacity onPress={()=>this.decrementCount(data.Count)}>
                    <Icon name='minuscircle' size={15} color={"#3b9c9c"}/>
                </TouchableOpacity>
                <Text style={styles.tileCounter}>{data.Count}</Text>
                <TouchableOpacity onPress={()=>this.incrementCount(data.Count)}>
                    <Icon name='pluscircle' size={15} color={"#3b9c9c"}/>
                </TouchableOpacity>    
            </View>
            <Text style={styles.tileRate}>{'\u20B9'} {35}</Text>
            <View
                style={styles.tileTextContainer}>
                <Text style={styles.tileTitle}>
                    {data.Name}
                </Text>                
            </View>
            <View
                style={styles.tileTextContainer}>
                <Text style={styles.tileBrand}>
                    {data.Brand}
                </Text>
            </View>
        </View>  
        );   
    }
}

const styles = StyleSheet.create({
    tileCounter:{
        paddingLeft:7,
        paddingRight:7,
        paddingBottom:5,
        justifyContent:'center',
        fontSize:13,
        bottom:2,
        alignItems:'center'
    },
    tileRate:{
        paddingLeft:5,
        color:'#CD5C5C',
        fontWeight:'500',
        fontFamily:'sans-serif-medium'
    },
    tile:{
        margin: 5,
        borderRadius:15,
        backgroundColor:'#fff' 
    },
    tileImage:{
        width: 80,
        height: 80,
        margin: 10
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
    },
    tileBrand:{
        color: '#606070',
        fontFamily:'sans-serif-medium', 
        fontStyle:'italic',
        fontWeight: '200',
        justifyContent:'center',
        alignItems:'center',
        padding:4 
    }
});

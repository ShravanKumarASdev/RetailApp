import React, { Component } from 'react';
import { View, ScrollView,TouchableOpacity, Image,ImageBackground, StyleSheet, Dimensions, Text, FlatList  } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { TileComponent } from './TileComponent';
const subCategoryImages={
    'Snacks':require('..//assets//SnackCartoon.jpg'),
    'Fruits':require('..//assets//FruitsCartoon.jpg'),
    'Vegetables':require('..//assets//Vegetablescartoon.jpg'),
    'Eye Makeup Products':require('..//assets//EyeMakeupCartoon.jpg'),
    'Pencils':require('..//assets//PencilsCartoon.jpg')
  };
export class SubcategoriesComponent extends Component {
  render() {
    const { data } = this.props;
      return(
          <View style={styles.container}>
            <View style={{ flexDirection: 'column',height:'20%',margin:20,top:30}}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>this.props.redirectBack()} style={{left:0,position:'absolute',top:15}}>
                    <View> 
                        <Icon name='leftcircle' size={25} color={"#3b9c9c"}/>
                    </View>
                </TouchableOpacity>
                <View>
                <Image
                    source={subCategoryImages[data.category]}
                    style={{ width: 55, height: 55, borderRadius: 15, alignSelf:'center'}}
                /> 
                <View style={{alignSelf:'center', paddingLeft:'39%',paddingRight:'39%',paddingTop:7,paddingBottom:7, backgroundColor:'#3b9c9c', borderRadius:25}}>
                    <Text style={{  fontFamily:'sans-serif-medium',fontStyle:'italic', color: '#fff',  fontSize:16,padding:7}}>
                        {data.category}
                    </Text>
                </View>
                </View>
                </View>
            </View>
            <FlatList
                data={data.data}
                numColumns={3}
                keyExtractor={(item, index) => index.toString() }
                renderItem={({item}) => (<TileComponent data={item}/>) }
            />
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'lightyellow'
    }
});

export {SubcategoriesComponent};
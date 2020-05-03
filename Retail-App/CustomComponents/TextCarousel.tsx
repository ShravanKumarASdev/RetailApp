import React, { Component } from 'react';
import { View, ScrollView,TouchableOpacity, Image,ImageBackground, StyleSheet, Dimensions, Text, FlatList  } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

const images={
  'Cosmetics':require('..//assets//CosmeticsNormal.jpg'),
  'Food and Beverage':require('..//assets//FoodnBeveragesNormal.jpg'),
  'Hair Care Products':require('..//assets//HaircareNormal.jpg'),
  'Stationery':require('..//assets//StationeryNormal.jpg')
};

export class TextCarousel extends Component {
  render() {
    const { data } = this.props;
    if (data && data.length) {
      return (
        <View
          style={styles.scrollContainer}>
          <ImageBackground
            resizeMode={'stretch'} // or cover
            style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
            source={require('..//assets//Bg12.jpg')} 
          >
          <View style={{height:"30%", flex:1,
                        flexDirection:'column'}}>
            <FlatList
              data={data}
              horizontal={true}
              renderItem={({item , index})=>{
                return (
                  <HorizontalFlatListItem item={item} index={index} parentFlatList={this} filterProducts={this.props.filterProducts}>
                    </HorizontalFlatListItem>);
              }}>
            </FlatList>
          </View>
          </ImageBackground>
        </View>
      );
    }
    return null;    
  }
}

class HorizontalFlatListItem extends React.Component{
  constructor(props){
    super(props);
    this.state={isSelected:false}
  }
  flipisSelected=()=>{
    this.setState({isSelected:!this.state.isSelected})
  }
    render(){
      let { isSelected } = this.props;
        return (
            <View
                style={[styles.textContainer,this.state.isSelected?
                    {borderBottomColor:'#fff',borderBottomWidth:5}:{}]}>
              <TouchableOpacity onPress={()=>{this.props.filterProducts(this.props.item.Category);this.flipisSelected();}}>
              {/* <Icon name='check' size={20} color={"black"}/> */}
                <Image
                  source={images[this.props.item.Category]}
                  style={{ width: 55, height: 55, borderRadius: 15, alignSelf:'center'}}
                /> 
                <Text>
                  <Text 
                    style={[styles.categoryInactive,this.state.isSelected?{fontWeight:'bold'}:{fontWeight:'normal'}]}>
                    {this.props.item.Category}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height:"23%",
    alignContent:'center'
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center',
    width:'80%',
    borderRadius:20,
    margin:10,
    padding:3,
    height:'80%'
  },
  categoryInactive:{
    fontSize:16,
    color:'black',
    margin:16,
    fontFamily:'sans-serif-medium',
    textAlign:'center',
    alignSelf:'center',
    alignContent:'center',
    fontStyle:'italic'
  }
});

export {TextCarousel};
import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text, FlatList  } from 'react-native';


export class TextCarousel extends Component {
  render() {
    const { data } = this.props;
    if (data && data.length) {
      return (
        <View
          style={styles.scrollContainer}>
          <View style={{height:100, flex:1,
                        flexDirection:'column'}}>
            <FlatList style={{backgroundColor:'#F0FFFF', opacity:0.6}}
              data={data}
              horizontal={true}
              renderItem={({item , index})=>{
                return (
                  <HorizontalFlatListItem item={item} index={index} parentFlatList={this} filterProducts={this.props.filterProducts}>
                    </HorizontalFlatListItem>);
              }}>
            </FlatList>
          </View>
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
                    {borderColor:'#fff',borderWidth:3,backgroundColor:'#080a57'}:{borderColor:'gray',borderWidth:1}]}>
                <Text onPress={()=>{this.props.filterProducts(this.props.item.category);this.flipisSelected();}}
                   style={[styles.categoryInactive,this.state.isSelected?{fontWeight:'bold',color:'#fff'}:{fontWeight:'normal'}]}>
                  {this.props.item.category}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height:"10%"
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    width:'80%',
    borderRadius:10,
    margin:4,
    height:'90%'
  },
  categoryInactive:{
    fontSize:16,
    color:'black',
    margin:16
  }
});

export {TextCarousel};
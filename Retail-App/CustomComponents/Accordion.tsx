import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                <Icon name='right' color={"#fff"} size={20}/>
                <Text style={[styles.title]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'minus' : 'plus'} size={20} color={"#fff"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={{}} scrollEnabled={false}>
                    <FlatList
                    data={this.state.data}
                    numColumns={1}
                    scrollEnabled={false}
                    renderItem={({item, index}) =>
                        <View>
                            <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnInActive:styles.btnActive]} onPress={()=>this.onClick(index)}>
                                <Icon name={'checkcircle'} size={24} color={item.value?'lightgray':'green'}/>
                                <Text style={[styles.font, item.value?styles.itemInActive:styles.itemActive]}>{item.key}</Text>
                            </TouchableOpacity>
                            <View style={styles.childHr}/>
                        </View>
                    }/>
                </View>
            }
       </View>
    )
  }

  onClick=(index)=>{
      const temp=this.state.data.slice();
      temp[index].value=!temp[index].value;
      this.setState({data:temp});
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:'100%',
        height:54,
        alignItems:'center',
        paddingLeft:35,
        paddingRight:35,
        fontSize:12
    },
    title:{
        fontSize: 20,
        fontWeight:'bold',
        color: '#fff',
    },
    itemActive:{
        fontSize:15,
        fontWeight:'bold',
        color:'#415c50'
    },
    itemInActive:{
        fontSize:15,
        fontWeight:'bold',
        color:'darkgray'
    },
    buttonActive:{
        borderColor:'green'
    },
    buttonInActive:{
        borderColor:'darkgray'
    },
    row:{
        borderRadius:30,
        alignSelf:'center',
        width:'95%',
        flexDirection: 'row',
        justifyContent:'space-between',
        height:60,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: '#2d7887',
    },
    childRow:{
        flexDirection:'row',
        left:15
    },
    parentHr:{
        height:1,
        color: '#fff',
        width:'100%'
    },
    childHr:{
        height:1,
        alignSelf:'center',
        backgroundColor:'lightgray',
        width:'80%'
    },
    colorActive:{
        borderColor:'green'
    },
    colorInActive:{
        borderColor:'darkgray'
    }
});
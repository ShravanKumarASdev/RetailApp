import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Accordian from './Accordion';

export default class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu :[
        { 
          title: 'Food and Beverage', 
          data: [
            {key:'Fruits', value:'false'},
            {key:'Vegetables', value:'false'},
          ]
        },
        { 
          title: 'Cosmetics',
          data: [
            {key:'Baby Products', value:'false'},
            {key:'Bath Preparations', value:'false'},
            {key:'Eye Makeup Preparations', value:'false'},
            {key:'Fragrance Preparations', value:'false'}
          ]
        },
        { 
         title: 'Stationery',
         data: [
          {key:'Books', value:'false'},
          {key:'File', value:'false'},
          {key:'Pencils', value:'false'},
          {key:'Pens', value:'false'}
        ]
        },
        { 
          title: 'Hair Care Products',
          data: [
            {key:'Hair oils', value:'false'},
            {key:'Shampoo', value:'false'},
            {key:'Hair Conditioners', value:'false'},
            {key:'Hair Dyes', value:'false'}
          ]
        }
      ]
     }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderAccordians() }
      </View>
    );
  }

  renderAccordians=()=> {
    const items = [];
    for (item of this.state.menu) {
        items.push(
            <Accordian 
                title = {item.title}
                data = {item.data}
            />
        );
    }
    return items;
}
}

const styles = StyleSheet.create({
  container: {
   flex:1,
   paddingTop:100,
   backgroundColor:"#fff",
   height:'100%'
  }
});
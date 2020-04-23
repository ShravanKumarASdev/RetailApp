import React,{ Component }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  Alert
} from 'react-native';
import { ImageCarousel } from './ImageCarousel';

const images=[
    "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    "https://thumbs.dreamstime.com/b/beautiful-dandelion-flower-flying-feathers-colorful-bokeh-background-macro-shot-summer-nature-scene-beautiful-dandelion-147400154.jpg",
    "https://iso.500px.com/wp-content/uploads/2016/04/stock-photo-150595123.jpg",
    "https://i.pinimg.com/236x/75/1b/cb/751bcb0a1c740f9d0bab419852717072.jpg",
    "https://image.shutterstock.com/image-photo/summer-background-flowers-nature-beautiful-260nw-1038824167.jpg"
];
export default class LandingView extends Component {
    constructor(){
        super();
        this.state = {
            isLoading:true,
            dataSource:[]
        }
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.card} onPress={() => alert(item.Name)}>
            <Image style={styles.cardImage} source={{uri:`data:image/jpeg;base64,${item.Image}`}}/>
            <Text style={styles.cardText}>{item.Name}</Text>
            <Text style={styles.cardText}>{item.Brand}</Text>
            <Text style={styles.cardText}>{item.Category}</Text>
        </TouchableOpacity>
    );

    render(){
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" animating/>
                </View>
            );    
        }
        else{
            return(
                <View style={styles.container}>
                    <ImageCarousel images={images} styles={{height:"30%"}}/>
                    <FlatList 
                        styles={{height:"70%"}}
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        keyExtractor = {(item,index)=>index.toString()}
                        numColumns={2}
                    />
                </View>
            );
        }
    }

    componentDidMount(){
        fetch('http://192.168.1.5:3001/Products').then((response) => {return response.json()})
        .then((response)=>{
            this.setState({
                isLoading:false,
                dataSource:response
            })
        })
        .catch((error) => {
                console.error(error);
              });
    }
}

const styles=StyleSheet.create({
    container:{
        borderTopWidth:30,
        height:"100%",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF'
    },
    item:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    card:{
        backgroundColor:'#fff',
        marginBottom:10,
        marginLeft:'2%',
        marginRight:'5%',
        width:150,
        height:220,
        shadowColor:'#000',
        borderRadius:8,
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
        height:'70%',
        resizeMode:'cover'
      },
      cardText:{
        color: '#a9a9a9',
        fontSize:12,
        height:'7%',
        paddingLeft:15
      }
});
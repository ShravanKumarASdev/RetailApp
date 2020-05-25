import React,{ Component }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { ImageCarousel } from './ImageCarousel';
import { TextCarousel } from './TextCarousel';
import Icon from "react-native-vector-icons/AntDesign";
import { TileComponent } from './TileComponent';
import { SubcategoriesComponent } from './SubcategoriesComponent';
import { TileDetailComponent } from './TileDetailComponent';

const images=[
    "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    "https://thumbs.dreamstime.com/b/beautiful-dandelion-flower-flying-feathers-colorful-bokeh-background-macro-shot-summer-nature-scene-beautiful-dandelion-147400154.jpg",
    "https://iso.500px.com/wp-content/uploads/2016/04/stock-photo-150595123.jpg",
    "https://i.pinimg.com/236x/75/1b/cb/751bcb0a1c740f9d0bab419852717072.jpg",
    "https://image.shutterstock.com/image-photo/summer-background-flowers-nature-beautiful-260nw-1038824167.jpg"
];

const subCategoryRedirectionCount=1;
const subCategoryImages={
    'Snacks':require('..//assets//SnackCartoon.jpg'),
    'Fruits':require('..//assets//FruitsCartoon.jpg'),
    'Vegetables':require('..//assets//Vegetablescartoon.jpg'),
    'Eye Makeup Products':require('..//assets//EyeMakeupCartoon.jpg'),
    'Pencils':require('..//assets//PencilsCartoon.jpg')
  };


export default class LandingView extends Component {
    selectedCategories=[];
    subCategories = [];
    constructor(){
        super();
        this.state = {
            isLoading:true,
            dataSource:[],
            productCategories:[],
            selectedSubcategory:[],
            isTileDetail:false
        };
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.card} onPress={() => alert(item.Name)}>
            <Image style={styles.cardImage} source={{uri:`data:image/jpeg;base64,${item.Image}`}}/>
            <Text style={styles.cardText}>{item.Name}</Text>
            <Text style={styles.cardText}>{item.Brand}</Text>
            <Text style={styles.cardText}>{item.Category}</Text>
        </TouchableOpacity>
    );

    renderTileDetail(){
        alert('hi');
        this.setState({
            isTileDetail:true
        });
    }

    filterProducts(selectedCategory:string){
        if(this.selectedCategories.includes("'"+selectedCategory+"'")){
            this.selectedCategories.splice(this.selectedCategories.indexOf("'"+selectedCategory+"'"),1);
        }
        else{
            this.selectedCategories.push("'"+selectedCategory+"'");
        }
        let categories = this.selectedCategories.join(",");
        categories=categories===''?'ALL':categories;
        this.retrieveProducts(categories);
    }

    redirectToCategories(subCategoryData){
        this.setState({
            selectedSubcategory:subCategoryData
        });
    }

    redirectBack(){
        this.setState({
            selectedSubcategory:[]
        });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" animating/>
                </View>
            );    
        }
        else{
                if(this.state.selectedSubcategory.length==0){
                    if(this.state.isTileDetail!==true)
                    {
                        return(
                        <View style={styles.container}>
                                <TextCarousel data={this.state.productCategories} filterProducts={this.filterProducts.bind(this)}/>                        
                                <ScrollView showsHorizontalScrollIndicator={false}>
                                        {this.state.dataSource.map(
                                            (item)=>(
                                            <React.Fragment>
                                                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                    <Image
                                                        source={subCategoryImages[item.category]}
                                                        style={{ width: 55, height: 55, borderRadius: 15, alignSelf:'center'}}
                                                    /> 
                                                    <Text style={{  textAlign:'center',fontFamily:'sans-serif-medium',fontStyle:'italic', color: '#fff',  fontSize:16, backgroundColor:'#3b9c9c',height:40,borderTopRightRadius:13,borderBottomRightRadius:13,padding:7}}>
                                                        {item.category}
                                                    </Text>
                                                    {item.data.length>subCategoryRedirectionCount &&
                                                        <TouchableOpacity onPress={()=>this.redirectToCategories(item)} style={{position:'absolute',right:0}}>
                                                            <View>
                                                                <Icon name='rightcircle' size={25} color={"#3b9c9c"}/>
                                                            </View>
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                                    <ScrollView
                                                        horizontal={true}
                                                        showsHorizontalScrollIndicator={false}>
                                                        {item.data.map((cardData,key)=>(
                                                            <TileComponent data={cardData} renderTileDetail={this.renderTileDetail.bind(this)}></TileComponent>
                                                        ))}
                                                </ScrollView>
                                            </View>            
                                        </React.Fragment>    
                                ))}
                                </ScrollView>
                        </View>);
                    }
                    else{
                        return(
                        <TileDetailComponent data={this.state.dataSource[0]['data'][0]}></TileDetailComponent>);
                    }
                }
                else{
                    return(
                    <SubcategoriesComponent data={this.state.selectedSubcategory} redirectBack={this.redirectBack.bind(this)}></SubcategoriesComponent>);
                }
            }
        }

    retrieveProducts(categories:string){
        let url ='http://192.168.1.6:3001/ProductsByCategory?categories="'+categories+'"';
        fetch(url).then((response) => {return response.json()})
        .then((response)=>{;
            this.subCategories=[...new Set(response.map(item=>item.Subcategory))];
            let data=[];
            this.subCategories.forEach(function(category) {
                let temp={};
                temp['category'] = category;
                response.forEach(function (element) {
                    element.Count = 0;
                  });
                temp['data']=response.filter(item=>item.Subcategory===category);
                data.push(temp);
            });
            this.setState({
                isLoading:false,
                dataSource:data
            })
        })
        .catch((error) => {
                console.error(error);
              });
    }

    componentDidMount(){
        this.retrieveProducts("ALL");

              fetch('http://192.168.1.6:3001/Products/Categories').then((response) => {return response.json()})
              .then((response)=>{
                  this.setState({
                    productCategories:response
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
        paddingLeft:5,
        height:"100%",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightyellow'
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
        paddingLeft:15,
        fontFamily:'sans-serif-medium',
        fontStyle:'italic'
      },
      hidden: { 
          display:'none'
        }
});
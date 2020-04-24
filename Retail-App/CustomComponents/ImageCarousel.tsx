import * as React from 'react';
import {StyleSheet,View,ScrollView,Dimensions,Image,TouchableOpacity} from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;

class ImageCarousel extends React.Component{
    scrollRef = React.createRef();

    setSelectedIndex =  event=>{
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.ContentOffset!==undefined? event.nativeEvent.ContentOffset.x : event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(contentOffset/viewSize);
        this.setState({selectedIndex});
    }

    onResponderReleaseHandler =  event=>{
        alert(event);
    }
    
    componentDidMount = ()=>{
        setInterval(()=>{
            this.setState(prev=>({selectedIndex:prev.selectedIndex === this.props.images.length-1?0:prev.selectedIndex+1}),
            ()=>{
                this.scrollRef.current.scrollTo({
                    animated:true,
                    y:0,
                    x:DEVICE_WIDTH*this.state.selectedIndex
                });
            });
        },3000);
    };

    constructor(props){
        super(props);

        this.state={
            selectedIndex:0
        };
    }

    render(){
        const {images} = this.props;
        const {selectedIndex} = this.state;
        return (
            <TouchableOpacity style={{height:"20%", width:"100%"}} onPress={()=> alert(images[selectedIndex])
                                                                                }>
                <ScrollView 
                    horizontal 
                    pagingEnabled 
                    onMomentumScrollEnd={this.setSelectedIndex}
                    onResponderRelease = {this.onResponderReleaseHandler}
                    ref={this.scrollRef}>
                    {images.map(image=>(
                        <Image
                            key={image}
                            source={{uri:image}}
                            style={styles.backgroundImage}/>
                    ))}
                </ScrollView>
                <View style={styles.circleDiv}>
                    {images.map((image,i)=>(
                        <View
                           key={image}
                           style={[styles.whiteCircle, {opacity:i===selectedIndex?0.5:1}]}
                        />
                    ))}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    backgroundImage:{
        height:"100%",
        width:DEVICE_WIDTH
    },
    circleDiv:{
        position:"absolute",
        bottom:15,
        height:10,
        display:"flex",
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    whiteCircle:{
        width:6,
        height:6,
        borderRadius:3,
        margin:5,
        backgroundColor:"#fff"
    }
});

export {ImageCarousel};
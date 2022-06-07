import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image ,StatusBar,ScrollView, Animated} from 'react-native'
import React ,{useState,useRef,useEffect}from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'
import { Character } from '../../assets/images';
import { useSelector,useDispatch } from 'react-redux';
import { getdataPoke } from '../../redux/actions';
import {firebase} from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';

const DetailPoke = ({route}) => {
  const userData = useSelector(state => state.appData.userData);
  const { dataUrl,dataName } = route.params;
  const [animated,setAnimated] = useState(false)
  const [release,setRelease] = useState(false)
  const fadeAnimation = useRef(new Animated.Value(0)).current  
  console.log("data url ",dataUrl)
  const navigation = useNavigation()
  const detailPoke= useSelector(state => state.appData.pokeDetail);
  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
        duration: 4000,
        useNativeDriver:false
    }).start();
    setAnimated(true)
    navigation.navigate("LoadingPoke",{
      getUrl : detailPoke.sprites.other.home.front_default,
      dataUrl:dataUrl,
      dataName:dataName
    })
  };
  console.log("detail poke: ",detailPoke)
  const getPokeData= () =>{
    firebase.app()
    .database('https://pokemonapp-35ffb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id)
    .orderByChild('name')
    .equalTo(dataName)
    .once("value")
    .then(async snapshot => {
      if (snapshot.val() == null) {
        console.log("snap ",snapshot.val())
            return false;
          }
          let pokeData = Object.values(snapshot.val())[0];
            console.log('poke data: ', pokeData);     
              setRelease(true)
              SimpleToast.show("Successfully!");
             
    })  
  }
    useEffect( () => {
    getPokeData()
  }, []);

  const goRelease = () =>{
    firebase.app()
    .database('https://pokemonapp-35ffb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id+"/"+dataName).remove().then(navigation.pop())
  }
  return (
    <SafeAreaView style={{flex:1}}>
          <StatusBar barStyle='dark-content' backgroundColor={'green'} />
            <View  style={{flexDirection:'row',justifyContent:'space-between',
        padding:10,paddingHorizontal:15,backgroundColor:"green",elevation:2,paddingVertical:15}}>
        <Icon size={35} color="white" name="chevron-back-sharp" onPress = {() => navigation.navigate("Home")}/> 
        <Text style={{color:'white',fontSize:30,fontWeight:'bold',paddingLeft:30}}>Pokemon Detail</Text>
      { release==true?
        <>
        <TouchableOpacity style={styles.btnCatch} onPress={goRelease}>
            <Text style={styles.textCatch}>Release</Text>
        </TouchableOpacity>
        </>
        : 
        <>
        <TouchableOpacity style={styles.btnCatch} onPress={fadeOut}>
            <Text style={styles.textCatch}>Catch</Text>
        </TouchableOpacity>
        </>
      }
       
        
      </View>
    <ScrollView>
        <View style={{flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
          {animated==true&&<>
          
           <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnimation
            }
           
          ]}
        >
          <Image source={{uri:detailPoke.sprites.other.home.front_default}} style={styles.character}/>
        </Animated.View>
          </> 
          }{animated==false&& 
          <Image source={{uri:detailPoke.sprites.other.home.front_default}} style={styles.character}/>
          }
            <Text style={{fontWeight:'bold', color:'#3d3d3d',fontSize:25,alignSelf:'center'}}>{detailPoke.name}</Text>
            <Text style={{fontWeight:'bold', color:'orange',alignSelf:'center',paddingTop:5,fontSize:18}}>Profile</Text>
        </View>

        <View style={{flexDirection:'column', justifyContent:'flex-start'}}>
            <View style={{marginTop: 10,marginBottom: 15, paddingHorizontal: 20}}>
                <Text style={styles.detailText}>Height : {detailPoke.height}</Text>
                <Text style={styles.detailText}>Weight : {detailPoke.weight}</Text>
                <Text style={styles.detailText}>Species: {detailPoke.species.name}</Text>
            </View>
        </View>

        <View style={{marginBottom: 5, paddingHorizontal: 20,flexDirection:'row'}}>
            <Text style={styles.subText}>Type</Text>
        </View>

        <View style={{ paddingHorizontal: 20,flexDirection:'row'}}>
        {
          detailPoke.types && detailPoke.types.map(item=>{ 
          return(
                <Text style={styles.detailText}> {item.type.name},</Text>
          )
        })}
        </View>

        <View style={{marginTop: 20, marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Ability</Text>
        </View>

        <View style={{ paddingHorizontal: 20,flexDirection:'row'}}>
        {
          detailPoke.abilities && detailPoke.abilities.map(item=>{ 
          return(
                <Text style={styles.detailText}> {item.ability.name},</Text>
          )
        })}
        </View>

        <View style={{marginTop: 20, marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Moves</Text>
        </View>

         <View style={{ paddingHorizontal: 20,flexDirection:'row',flexWrap:'wrap'}}>
        {
          detailPoke.moves && detailPoke.moves.map(item=>{ 
          return(
                <Text style={styles.detailText}> {item.move.name},</Text>
          )
        })}
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default DetailPoke

const styles = StyleSheet.create({
    btnCatch: {
        borderRadius: 10,
        elevation: 3,
        width: 70,
        height : 30,
        alignSelf:'center',
        backgroundColor: 'red',
         justifyContent:'center',
    },
      btnMoves: {
        borderRadius: 10,
        elevation: 3,
        width: 180,
        height : 35,
        alignSelf:'center',
        backgroundColor: 'red',
         justifyContent:'center',
    },
    textCatch: {
        fontSize: 18,
        alignSelf:'center',
        fontWeight: 'bold',
        color: 'white',
    },
    character: {
        height:250,
        width: 250,
        alignSelf:'center',
    },
    subText: {
        fontSize: 25,
        fontFamily: 'Roboto-Medium',
        fontWeight: 'bold',
        color:'#3d3d3d'
    },
    detailText: {
        fontSize : 18,
        fontFamily: 'Roboto-Regular',
        textAlign: 'justify',
        color:'#3d3d3d'
    },
})
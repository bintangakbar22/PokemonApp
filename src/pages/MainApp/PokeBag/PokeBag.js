import { StyleSheet, Text, View ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,Image} from 'react-native'
import React, { startTransition, useEffect ,useState,useMemo,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_LOGIN } from '../../../redux/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAllPoke,getdataPoke,getNextPoke } from '../../../redux/actions';
import {firebase} from '@react-native-firebase/database';
const PokeBag = ({route}) => {
  const userData = useSelector(state => state.appData.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pokeData,setPokeData] = useState([])
  const goLogout = () => {
    navigation.navigate('Login')
    navigation.reset({index: 0,routes: [{ name: "Login" }],});
    dispatch({ type :FETCH_LOGIN,userData:{},isLogin:false})
  }

  const getPokeData= useCallback(() => {
    firebase.app()
    .database('https://pokemonapp-35ffb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id)
    .orderByChild('name')
    .on('value', snapshot => {
      if (snapshot.val() != null) {
        setPokeData(Object.values(snapshot.val()))
      }else{
        setPokeData(pokeData)
      }
    }); 
  },[pokeData])
    useEffect(() => {
        getPokeData()
  }, []);
  const goHome = () =>{
      navigation.navigate("Home")
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle='dark-content' backgroundColor={'green'} />
      <View  style={{flexDirection:'row',justifyContent:'space-between',
        padding:10,paddingHorizontal:15,backgroundColor:"green",elevation:2,paddingVertical:15}}>
        <TouchableOpacity onPress={goHome}>
            <Icon size={35} color="white" name="home" /> 
        </TouchableOpacity>
        
        <Text style={{color:'white',fontSize:30,fontWeight:'bold',paddingLeft:30}}>Pokedex</Text>
        <View style={{flexDirection:'row'}}>
          <Icon size={35} color="white" name="bag-personal-outline" style={{paddingRight:5}} />    
          <TouchableOpacity onPress={goLogout}>
          <Image style={styles.logo} source={{uri:userData.avatar}}  />  
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
       {
          pokeData && pokeData.map(item=>{ 
          return(
            <TouchableOpacity onPress={()=>{
              dispatch(getdataPoke(item.url)).then(
                navigation.navigate("DetailPoke",{
                  dataUrl:item.url,
                  dataName:item.name
                })
              )
                }} style={styles.button}>
              <View style={{justifyContent:'flex-start'}}>
                <Icon size={35} color="black" name="pokeball"/> 
              </View>
              <View style={{justifyContent:'center'}}>
                    <Text style={{color:'black',fontSize:17,paddingLeft:20}}>{item.name}</Text>
              </View>
            
            </TouchableOpacity>
          )
        })}
       
      </View>
    
    </SafeAreaView>
  )
}

export default PokeBag


const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
    button: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    width: screen.width * 0.45,
    height: 50,
    backgroundColor: 'white',
    flexDirection:'row',
  },
      logo: {
        width:35,
        height:35,
        borderRadius:20
      },
          but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
         but2: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
})
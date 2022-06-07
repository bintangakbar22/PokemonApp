import { StyleSheet, Text, View ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,Image} from 'react-native'
import React, { startTransition, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_LOGIN } from '../../redux/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getNextPoke } from '../../redux/actions';
const Pokemon = ({route}) => {
  const { dataUrl } = route.params;
  console.log("data url  :",dataUrl)
  const userData = useSelector(state => state.appData.userData);
    useEffect(  () => {
    dispatch(getNextPoke(dataUrl))
  }, [])
 const pokeData = useSelector(state => state.appData.pokeData.results);
  const pokeNext = useSelector(state => state.appData.pokeData.next);
  const pokePrevious = useSelector(state => state.appData.pokeData.previous);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("user data home :",userData)
  
  console.log("poke data next :",pokeNext)
    console.log("poke data previous :",pokePrevious)

  const goLogout = () => {
    navigation.navigate('Login')
    navigation.reset({index: 0,routes: [{ name: "Login" }],});
    dispatch({ type :FETCH_LOGIN,userData:{},isLogin:false})
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle='dark-content' backgroundColor={'green'} />
      <View  style={{flexDirection:'row',justifyContent:'space-between',
        padding:10,paddingHorizontal:15,backgroundColor:"green",elevation:2,paddingVertical:15}}>
        <Icon size={35} color="white" name="home" /> 
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
            <TouchableOpacity onPress={()=>{navigation.navigate("DetailPoke") }} style={styles.button}>
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
          <TouchableOpacity 
      style={styles.but}
      onPress={()=>navigation.navigate('Pokemon',{
                    dataUrl: pokePrevious, 
                      })
                }>
          <Icon 
              name="page-first"
              color="white"
              size={30}
          />
      </TouchableOpacity>
       <TouchableOpacity 
      style={styles.but2}
      onPress={()=>navigation.navigate('Pokemon',{
                    dataUrl: pokeNext, 
                      })
                }>
          <Icon 
              name="page-last"
              color="white"
              size={30}
          />
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default Pokemon
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
    left: 15,
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
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
})
import { StyleSheet,Animated,SafeAreaView,StatusBar,Image,TouchableOpacity} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import SimpleToast from 'react-native-simple-toast'
import { useSelector } from 'react-redux'
import {firebase} from '@react-native-firebase/database';
const LoadingPoke = ({route}) => {
  const navigation = useNavigation()
  const userData = useSelector(state => state.appData.userData);
  const {getUrl,dataUrl,dataName} = route.params
  const progress = useRef(new Animated.Value(0.5)).current  
  const scale = useRef(new Animated.Value(1)).current  
  useEffect(() => {
    // withTiming, withSpring

    // withRepeat
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
      ]),
      { iterations: 3 }
    ).start();
    
  }, []);
  const goGambling = ()=>{
    var index = Math.floor(Math.random()*2)
    console.log("index : ",index)
    if(index==1){
        const pokeData = {
                        name: dataName, 
                        url: dataUrl, 
                        id: userData.id,  
        }
        firebase.app()
                    .database('https://pokemonapp-35ffb-default-rtdb.asia-southeast1.firebasedatabase.app/')
                    .ref('/pokeBag/'+userData.id+"/"+dataName)
                    .set(pokeData)
        navigation.navigate("Home")
        SimpleToast.show("Catch Successfull!");

    }else{
        navigation.pop()
        SimpleToast.show("Catch Failed!");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {    
            opacity: progress,
            transform: [
              { scale },
            ],
          },
        ]}
      >
      <TouchableOpacity onPress={goGambling}>
        <Image source={{uri:getUrl}} style={styles.character}/>
      </TouchableOpacity>
            
        </Animated.View>
    </SafeAreaView>
  )
}

export default LoadingPoke
const SIZE = 100.0;
const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
   
  },
      character: {
        height:150,
        width: 150,
        alignSelf:'center',
    },
})
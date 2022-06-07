import { View,ImageBackground,Dimensions ,SafeAreaView,StatusBar,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { BG } from '../assets/images';
import { useSelector } from 'react-redux';

const Splash = () => {
    const isLogin = useSelector(state => state.appData.isLogin);
    const navigation = useNavigation();
    const getUser = async () => {
        if(isLogin==true){
                navigation.replace("Home")
        }else{
                navigation.replace("Login")
        }   
    }
    useEffect(  () => {
        setTimeout(() => {
            getUser()
        }, 3000);
    }, [navigation])
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={BG} style={{flex:1,width:screen.width*1}}/>
        </SafeAreaView>
    )
}

export default Splash
const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    background : {
      flex : 1,
      backgroundColor : '#00000',
      width: screen.width * 1.0,
    },

}) 

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home,Splash,Register,DetailPoke,Login,Pokemon,LoadingPoke,PokeBag } from '../pages';
const Stack = createStackNavigator();


const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component = {Splash} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component = {Login} options={{headerShown: false}}/> 
        <Stack.Screen name="Register" component = {Register} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component = {Home} options={{headerShown: false}}/>
        <Stack.Screen name="Pokemon" component = {Pokemon} options={{headerShown: false}}/>
        <Stack.Screen name="DetailPoke" component = {DetailPoke} options={{headerShown: false}}/>
        <Stack.Screen name="LoadingPoke" component = {LoadingPoke} options={{headerShown: false}}/>
        <Stack.Screen name="PokeBag" component = {PokeBag} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}


export default Router
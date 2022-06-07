import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import {Provider} from 'react-redux'
import Store,{PersistStor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
const codePushOptions= {checkFrequency:codePush.CheckFrequency.ON_APP_START};
const App = () => {
  return (
        <Provider store={Store}>
        <PersistGate loading ={null} persistor={PersistStor}>
         <NavigationContainer>
           <Router />
         </NavigationContainer>
         </PersistGate>
         </Provider>
  )
}

export default codePush(codePushOptions)(App);
import { StyleSheet, Text, View ,TextInput,Dimensions} from 'react-native'
import React from 'react'

const Input = ({onChangeText,value,placeHolder,secureTextEntry,error}) => {
  return (
    <View>
      <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={'#000000'}
          secureTextEntry={secureTextEntry}
      />
      {/* {error.email ||error.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{error}</Text>
       } */}
    </View>
  )
}

export default Input
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
    input: {
    padding: 10,
    marginVertical: 10,
    width: screen.width * 0.8,
    fontSize: 18,
    color: '#000000',
    borderRadius: 1,
    elevation: 1,
    borderColor:'black',
    alignSelf: 'center'
  }
})
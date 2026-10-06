import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Prop = NativeStackScreenProps<RootStackParamList, "Home">
const HomeScreen = ({navigation}: Prop) => {
  return (
    <SafeAreaView style={{gap: 10, width: "100%", alignItems: 'center'}}>
      <Text style={{textAlign: "center", fontSize: 25, fontWeight:"bold", marginTop: 40}}>A premium online store for sporter and their stylish choice</Text>
      <View style={{backgroundColor:"#e2b2b2", width: 359, height: 388, borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
        <Image source={require("../../assets/bike_blue.png")}/>
      </View>
      <Text style={{textAlign: "center", fontSize: 25, fontWeight:"bold"}}>POWER BIKE SHOP</Text>

      <Button mode='contained' textColor='white' style={{width: 200}} buttonColor='red' onPress={()=> navigation.navigate("BikeStore")}>Get Started</Button>
      <Button mode='contained'  textColor='white' style={{width: 200}} buttonColor='blue' onPress={()=> navigation.navigate("Profile")}>Information Student</Button>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
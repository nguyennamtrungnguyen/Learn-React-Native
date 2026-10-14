import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, "Home"> 
const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={{gap: 20}}>
        <Text style={{fontSize: 30, fontWeight: "bold", color: "blue", textAlign: "center", margin: 30}}>Chào Mừng Bạn Đến Với Ứng Dụng Của Chúng Tôi</Text>
        <Button mode='contained' buttonColor='blue' onPress={()=> navigation.navigate("Profile")}>Quản Lý Thông Tin</Button>
        <Button mode='contained' buttonColor='red' onPress={()=> navigation.navigate("Tour")}>Đặt Tour</Button>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
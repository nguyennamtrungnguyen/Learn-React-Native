import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
 
type Props = NativeStackScreenProps<RootStackParamList, "Home">

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Chào Mừng Bạn Đến Với Cửa Hàng</Text>
      <Pressable onPress={()=> navigation.navigate("PhoneDetail")}>
        <Text>Trang mua sản phẩm</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
type Props = NativeStackScreenProps<RootStackParamList, "Home">
const PhoneDetail = ({navigation}: Props) => {
  return (
    <View>
          <Pressable onPress={()=> navigation.navigate("PhoneSelect")}>
            <Text>Trang chọn sản phẩm</Text>
          </Pressable>
           <Pressable onPress={()=> navigation.navigate("Home")}>
            <Text>Trang chủ</Text>
          </Pressable>
        </View>
  )
}

export default PhoneDetail

const styles = StyleSheet.create({})
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
type Props = NativeStackScreenProps<RootStackParamList, "Home">
const PhoneSelect = ({navigation}: Props) => {
  return (
    <View>
      <Pressable onPress={()=> navigation.navigate("PhoneDetail")}>
        <Text>Trang chi tiết sản phẩm</Text>
      </Pressable>
    </View>
  )
}

export default PhoneSelect

const styles = StyleSheet.create({})
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, "Home">
const PhoneDetail = ({navigation}: Props) => {
  return (
    <View>
          <View>
            {/* Image Product */}
            <Image source={{uri: ""}}></Image>
          </View>

          <View>
            <Text>
              {/* title */}
            </Text>
            <View>
              <View>
                {/* Icon star */}
                {[1,2,3,4,5].map(()=> <AntDesign name="star" size={24} color="yellow" />)}
              </View>
              <Pressable><Text>(Xem 828 đánh giá)</Text></Pressable>
            </View>
            {/* Price */}
            <View>
              <Text>Price giảm</Text>
              <Text>Price gốc</Text>
            </View>

             <View>
              <Text>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
              <AntDesign name="question-circle" size={24} color="black" />
            </View>

            <Pressable><Text>4 MÀU - CHỌN MÀU</Text><AntDesign name="right" size={24} color="black" /></Pressable>
          </View>

          <Pressable><Text>CHỌN MUA</Text></Pressable>
        </View>
  )
}

export default PhoneDetail

const styles = StyleSheet.create({})
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const PhoneDetail = ({navigation}: Props) => {
  return (
    <View>
          <View>
            {/* Image Product */}
            <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJynMQVWZmnFn6Z8oW6I4CobTcXJc87rF1mhEVIUsE5Q&s=10"}}/>
          </View>

          <View>
            <Text>
              {/* title */}
              Điện Thoại Vsmart Joy 3 - Hàng chính hãng
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
              <Text>1.790.000</Text>
              <Text>1.990.000</Text>
            </View>

             <View>
              <Text>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
              <AntDesign name="question-circle" size={24} color="black" />
            </View>

            <Pressable onPress={()=> navigation.navigate("PhoneSelect")}><Text>4 MÀU - CHỌN MÀU</Text><AntDesign name="right" size={24} color="black" /></Pressable>
          </View>

          <Pressable><Text>CHỌN MUA</Text></Pressable>
        </View>
  )
}

export default PhoneDetail

const styles = StyleSheet.create({

})
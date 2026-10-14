import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{gap: 10}}>
        <Text style={{fontSize: 30, fontWeight: "bold", color: "blue", textAlign: "center", margin: 30}}>Thông Tin Sinh Viên</Text>
        <TextInput value='Nguyễn Nam Trung Nguyên' label={"Họ và tên"}/>
        <TextInput value='23640731' label={"MSSV"}/>
        <TextInput value='DHKTPM19ATT' label={"Lớp"}/>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
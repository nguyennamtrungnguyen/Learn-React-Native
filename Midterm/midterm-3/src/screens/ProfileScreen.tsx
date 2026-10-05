import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const ProfileScreen = () => {
  return (
    <View style={{ gap: 10 }}>
      <TextInput label={"Họ và tên"} value="Nguyễn Nam Trung Nguyên" />
      <TextInput label={"MSSV"} value="23640731" />
      <TextInput label={"Lớp"} value="DHKTPM19ATT" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

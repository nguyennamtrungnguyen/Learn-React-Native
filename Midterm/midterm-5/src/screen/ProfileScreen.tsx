import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const ProfileScreen = () => {
  return (
    <View>
      <TextInput value="Nguyễn Nam Trung Nguyên" label={"Họ và tên"} />
      <TextInput value="23640731" label={"MSSV"} />
      <TextInput value="DHKTPM19ATT" label={"Lớp"} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

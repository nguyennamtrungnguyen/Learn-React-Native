import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../header/Header'
import BookCardScreen from './BookCardScreen'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <BookCardScreen/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
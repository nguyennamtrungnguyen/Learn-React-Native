import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Book, BookCardItemProps } from '../../interface/BookInterface'

const ImageBackgroundBook = () => {
  return (
    <View style={styles.container}>
       <View style={styles.coverContainer}>
        <Image source={{uri: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg"}}/>
       </View>

    </View>
  )
}

export default ImageBackgroundBook

const styles = StyleSheet.create({
    container: {},
    coverContainer: {}
})
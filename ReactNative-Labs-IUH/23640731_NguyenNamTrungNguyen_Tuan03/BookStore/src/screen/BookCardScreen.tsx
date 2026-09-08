import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookCardScreen = () => {
  return (
    <View style={styles.bookCardContainer}>
        <View style={styles.bookCard}>
            <View style={styles.bookCardLeft}>
                <Image 
                source={require('../../../assets/book_image/book1.webp')} 
                style={styles.bookImage} 
                resizeMode="contain" 
                />
            </View>
            <View style={styles.bookCardRight}>
                <Text style={styles.title}>Tên sách không bị đẩy lề</Text>
                <Text style={styles.title}>Tên sách không bị đẩy lề</Text>
                <Text style={styles.title}>Tên sách không bị đẩy lề</Text>
            </View>
            </View>
    </View>
  )
}

export default BookCardScreen

const styles = StyleSheet.create({
    
    bookCardContainer:{
        width: "100%",
    flexDirection: 'row', 
    marginTop: 20

    },
  bookCard: {

    flexDirection: 'row', 
    width: "100%",
    height: 150,          
    padding: 10,
    backgroundColor: "#1DCED8",
borderRadius:20,
marginLeft: 10,
marginRight: 10
  },
  bookCardLeft: {
    height: "100%",     
    aspectRatio: 2 / 3,  
    alignItems: 'flex-start', 
  },
  bookImage: {
    width: "100%",        
    height: "100%",    
    borderRadius: 10,
  },
  bookCardRight: {
    flex: 1,            
    paddingLeft: 15,    
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})

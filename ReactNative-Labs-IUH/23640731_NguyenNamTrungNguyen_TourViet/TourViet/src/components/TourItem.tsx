import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { Tour } from '../interfaces/Tour'

type TourItemProps = {
    tour: Tour, 
    compact?: boolean, 
    onPress: (id: string) => void
}
const TourItem = ({tour, compact=false, onPress}: TourItemProps) => {
    const isTile = compact = true
  return (
    <TouchableOpacity>
      <Card>
        <View>
            <Image source={{uri: tour.image}}/>
            <View>
                <Text>{tour.name}</Text>
                <Text>{tour.city}</Text>
                <Text>{tour.days}</Text>
                <Text>{tour.price}</Text>
                <Text>{tour.seats}</Text>
                <Text>{tour.departure}</Text>
                <Text>{tour.departure}</Text>
                <Text>{tour.isFavorite}</Text>
            </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default TourItem

const styles = StyleSheet.create({})
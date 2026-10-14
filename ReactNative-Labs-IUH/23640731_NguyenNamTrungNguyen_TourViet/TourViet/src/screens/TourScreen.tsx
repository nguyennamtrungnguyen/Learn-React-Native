import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Button, TextInput } from 'react-native-paper'
import AntDesign from '@expo/vector-icons/AntDesign';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useFetch } from '../hooks/useFetch';
import { Tour } from '../interfaces/Tour';
import TourItem from '../components/TourItem';

type Props = NativeStackScreenProps<RootStackParamList, "Tour">
const baseURL = "https://6ac9d31e3115bcc958200b62.mockapi.io/"
const TourScreen = ({navigation}: Props) => {

    const {isLoading, error, get} = useFetch(baseURL);
    const [tours, setTours] = useState<Tour[]>([])
    const [refreshing, setRefreshing] = useState(false);
    const [isTile, setIsTile] = useState(false);
    const fetchTour = async () => {
        const res = await get("/tours")
        if(res) return setTours(res);
    }

    useEffect (()=> {
        fetchTour()
    }, [])

    const handleRefreshing = async ()=> {
        setRefreshing(true);
        fetchTour()
        setRefreshing(false)
    }

    const handleSelect = (id: string) => {
        navigation.navigate("Detail", {id})
    }
  return (
    <SafeAreaView style={{gap: 10}}>
        <Text style={{fontSize: 30, fontWeight: "bold", color: "blue", textAlign: "center", margin: 10}}>Tour Việt</Text>
        <View style={{flexDirection:"row", width: "100%", justifyContent: "space-around"}}>
            <TextInput style={{width: "80%"}} value='' label={"Tìm tour theo tên..."} placeholder='Tìm tour theo tên..'/>
            <AntDesign name="search" size={50} color="blue"  />
        </View>
        {
            ["All", "HoChiMinh", "HaNoi"].map((city)=> 
                <Button buttonColor='blue' mode='contained' onPress={()=>{}}>{city}</Button>
            )
        }

        {error && <Text style={{fontSize: 30, fontWeight: "bold", color: "blue", textAlign: "center", margin: 10}}>Lỗi : {error}</Text>}
        {isLoading && ! refreshing 
        ? (<View>
            <Text style={{fontSize: 30, fontWeight: "bold", color: "blue", textAlign: "center", margin: 10}}>Đang tải dữ liệu...</Text>
            <ActivityIndicator size={"large"} animating={true}/>
        </View>)
        : (<FlatList data={tours} keyExtractor={(item)=> item.id} renderItem={({item}) => <TourItem tour={item} compact={isTile ? true :false} onPress={handleSelect}/>}/>)}
        
    </SafeAreaView>
  )
}

export default TourScreen

const styles = StyleSheet.create({})
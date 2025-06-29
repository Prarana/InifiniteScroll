import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import { useState } from 'react';


const HomeScreen = () => {

const [view, setView] = useState(0);
const initialData = [
    {id: "1", name: "Wheat", stock  : 5, unit : "kg"},
    {id: "2", name: "Dal", stock  : 15, unit : "kg"},
    {id: "3", name: "Chawal", stock  : 25, unit : "kg"},
    {id: "4", name: "Jowar", stock  : 35, unit : "kg"},
    {id: "5", name: "Bajra", stock  : 45, unit : "kg"},
    {id: "6", name: "amrant", stock  : 55, unit : "kg"}
];
const [data, setdata] = useState(initialData);

  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Dashboard</Text>
      <View style = {styles.buttonContainer}>
        <Pressable style = {[styles.button, view === 0 ? {backgroundColor : "green"} : null]} onPress = {()=>setView(0)}>
            <Text style = {[styles.btnText, view === 0 ? {color : "white"} : null]}> All Items</Text>
        </Pressable>
        <Pressable style = {[styles.button, view === 1 ? {backgroundColor : "green"} : null]} onPress = {()=>setView(1)}>
            <Text style = {[styles.btnText, view === 1 ? {color : "white"} : null]}> Low Stock</Text>   
        </Pressable>
        <Pressable style = {[styles.button, view === 2 ? {backgroundColor : "green"} : null]} onPress = {()=>setView(2)}>
            <Text style = {[styles.btnText, view === 2 ? {color : "white"} : null]}> Create</Text>
        </Pressable>
      </View>

    {view  === 0 && <AllItems data={data}/>}
    {view  === 1 && <AllItems data={data.filter((item)=> item.stock<25)}/>}
    {view  === 2 && <CreateScreen data={data} setdata={setdata}/>}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

    container : {
        width : "100%",
        height  : "100%",
        padding  :"5%",
        backgroundColor : "#ffffff"
    },
    title : {
        fontSize : 24,
        fontWeight : "bold",
        color: "#000000",
        bottom : 5,
        top:5
    },
    buttonContainer:{
        flexDirection :"row",
        gap:15,
        top:1,
        paddingVertical:20
    },
    button:{
        padding : "2%",
        borderRadius : 50,
        borderWidth : 1,
        borderColor : "green"

    },
    btnText : {
        fontWeight : "bold",
        fontSize :  12,
        color : "green"
    }
})
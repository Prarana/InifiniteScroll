import { StyleSheet, Text, View , TextInput, Pressable, FlatList} from 'react-native'
import React, { useCallback, useState } from 'react'

const CreateScreen = ({data, setdata}) => {

const [itemName, setitemName]  = useState('');
const [stockAmt, setstockAmt]  = useState('');
const [addOrEdit, setaddOrEdit]  = useState("ADD ITEM");
const [editItem, seteditItem]  = useState('');

const renderItem = useCallback(
    ({item}) => (
        <View style={[styles.itemContainer, item.stock < 25 ? {backgroundColor : "pink"} : {backgroundColor : "lightgreen"}]}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.stock}</Text>
            <View style={styles.itemContainer}>
                <Pressable onPress={()=>onEdit(item)}>
                    <Text style={styles.itemText}>Edit    </Text>
                </Pressable>
            
                <Pressable onPress={()=>onDelete(item.id)}>
                    <Text style={styles.itemText}>    Delete</Text>
                </Pressable>

            </View>
        </View>
    )
  );

const onDelete =  (id) => {
    setdata(data.filter((item)=> item.id !== id));
}

const onEdit =  (item) => {
    setitemName(item.name);
    setstockAmt(item.stock.toString());
    setaddOrEdit("EDIT ITEM");
    seteditItem(item);
}

const onPressAddItem = () => {
    if(addOrEdit === "EDIT ITEM"){
        setdata(data.map((item) => (
            item.id === editItem.id ? {...item, name: itemName,  stock:stockAmt} : item
        )))
    }else{
    const  temp = {id: data.length+1, name: itemName, stock: stockAmt, unit : "kg"};
    setdata([...data, temp]);
    setitemName('')
    setstockAmt('')
    }
}; 


  return (
    <View style = {styles.container}>
        <TextInput 
            placeholder='Enter an item name' 
            placeholderTextColor="#999"
            style = {styles.input}
            value = {itemName}
            onChangeText={setitemName}
        ></TextInput>


        <TextInput 
            placeholder='Enter stock amount' 
            placeholderTextColor="#999"
            style = {styles.input}
            value = {stockAmt}
            onChangeText={setstockAmt}
        ></TextInput>

        <Pressable style={styles.btnCreate} onPress={onPressAddItem}>
            <Text style = {styles.btnText}>{addOrEdit}</Text>
        </Pressable>


        <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Items in stock</Text>
         </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle = {{gap:10}}
      />
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({

    container  : {
        flex: 1,
        padding : "4%",
        gap : 10
    },
    input : {
        borderRadius : 5,
        borderColor : "#000",
        padding  : 10,
        borderWidth : 1
    },
    btnCreate : {
        borderRadius : 5,
        borderColor : "purple",
        padding  : 10,
        borderWidth : 1,
        backgroundColor : "pink",
        alignItems : "center"

    },
    btnText : {
        fontWeight : "bold",
        fontSize : 16
    },
    headingContainer: {
        top:10,
        paddingHorizontal: 10
      },
      headingText: {
        fontWeight: 'bold',
        fontSize: 16
      },
      itemContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    
      itemText: {
        fontSize: 14
      },
})
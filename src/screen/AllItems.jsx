import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React, {useCallback} from 'react';

const AllItems = ({data}) => {

    const renderItem = useCallback(
        ({item}) => (
            <View style={[styles.itemContainer, item.stock < 25 ? {backgroundColor : "pink"} : {backgroundColor : "lightgreen"}]}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.stock}</Text>
            </View>
        )
      );
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle = {{gap:10}}
        onEndReachedThreshold={0.5} // load more items when 50% end is near
        initialNumToRender={2} // rendering limited items initially for performance
        maxToRenderPerBatch={10} // Virtualize list by rendering items in batches
        windowSize={5}
      />

    </View>
  )
}

export default AllItems;

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    paddingVertical: 10,
    top : 10,
  },

  itemText: {
    fontSize: 14
  },
});

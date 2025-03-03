import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { data, loading, page, hasMore } = useSelector((state) => state.posts);

  useEffect(() => {
    if(hasMore){
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page, hasMore]);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.item}>
        <Text style={styles.title}>{item.id}. {item.title}</Text>
        <Text>{item.body}</Text>
      </View>
    ),
    []
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPosts(page));
    }
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return null;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5} // load more items when 50% end is near
      ListFooterComponent={renderFooter} 
      initialNumToRender={10} // rendering limited items initially for performance
      maxToRenderPerBatch={10} // Virtualize list by rendering items in batches
      windowSize={5} 
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PostList;

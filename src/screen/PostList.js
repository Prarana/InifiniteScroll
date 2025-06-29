import React, {useEffect, useCallback} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Appbar, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipes} from '../redux/postsSlice';
import {useNavigation} from '@react-navigation/native';
import {useThemeContext} from '../contexts/ThemeContext';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


const PostList = () => {
  const dispatch = useDispatch();
  const {items, loading, page, hasMore} = useSelector(state => state.recipes);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useThemeContext();
  const {t} = useTranslation();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchRecipes(1)); 
    }
  }, [dispatch]);

  const navigateToPostDetails = items => {
    navigation.navigate('PostDetails', {items});
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; 
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => backHandler.remove();
    }, [])
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity onPress={() => navigateToPostDetails(item)}>
        <View style={[styles.item,
            {backgroundColor: theme.dark ? index % 2 === 0 ? 'maroon' : '#2b2b2b' : index % 2 === 0  ? '#ffffff' : '#fceae3'},
        ]}>
          <Image source={{ uri: item.image,}} style={styles.image}/>

          <View style={styles.flexName}>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              {item.name}
            </Text>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              {item.rating} ⭐
            </Text>
          </View>
          <View style={styles.flexName}>
            <Text style={[styles.itemCuisine, {color: theme.colors.text}]}>
              {item.cuisine}
            </Text>
            <Text style={[styles.itemCalories, {color: theme.colors.text}]}>
              {t('reviews')} : {item.reviewCount}
            </Text>
          </View>
          <Text style={[styles.itemCalories, {color: theme.colors.text}]}>
            {item.caloriesPerServing} {t('calories')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [theme.colors.text],
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchRecipes(page));
    }
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#900000" />;
    }
    return null;
  };

  return (
    <View style={styles.box}>
        <Appbar.Header
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 5,
            zIndex: 2,
          }}>
          <Appbar.Content title={t('recipieList')} />
          <Switch value={theme.dark} onValueChange={toggleTheme} />
        </Appbar.Header>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    width : "100%",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  title: {
    fontWeight: 900,
    fontSize: 18,
    top: 10,
  },
  flexName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCuisine: {
    paddingVertical: 5,
    fontSize: 16,
    top: 10,
    fontStyle: 'italic',
  },
  itemCalories: {
    paddingVertical: 5,
    fontSize: 16,
    top: 10,
    fontWeight: 600,
  },
});

export default PostList;

// import React, {useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchPosts} from '../redux/postsSlice';
// import {useNavigation} from '@react-navigation/native';
// import {useThemeContext} from '../contexts/ThemeContext';

// const PostList = () => {
//   const dispatch = useDispatch();
//   const {data, loading, page, hasMore} = useSelector(state => state.posts);
//   const navigation = useNavigation();
//   const {theme, toggleTheme} = useThemeContext();

//   useEffect(() => {
//     if (hasMore) {
//       dispatch(fetchPosts(page));
//     }
//   }, [dispatch, page, hasMore]);

//   const navigateToPostDetails = post => {
//     navigation.navigate('PostDetails', {post});
//   };

//   const renderItem = useCallback(
//     ({item, index}) => (
//       <TouchableOpacity onPress={() => navigateToPostDetails(item)}>
//         <View
//           style={[
//             styles.item,
//             {
//               backgroundColor: index % 2 === 0 ? '#7d9a4b' : '#ADD8E6',
//             },
//           ]}>
//           <Text style={[styles.title, {color: theme.colors.text}]}>
//             {item.id} . {item.title}
//           </Text>
//           <Text style={{color: theme.colors.text}}>{item.body}</Text>
//         </View>
//       </TouchableOpacity>
//     ),
//     [theme.colors.text],
//   );

//   const handleLoadMore = () => {
//     if (!loading && hasMore) {
//       dispatch(fetchPosts(page));
//     }
//   };

//   const renderFooter = () => {
//     if (loading) {
//       return <ActivityIndicator size="large" color="#0000ff" />;
//     }
//     return null;
//   };

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={item => item.id.toString()}
//       renderItem={renderItem}
//       onEndReached={handleLoadMore}
//       onEndReachedThreshold={0.5} // load more items when 50% end is near
//       ListFooterComponent={renderFooter}
//       initialNumToRender={10} // rendering limited items initially for performance
//       maxToRenderPerBatch={10} // Virtualize list by rendering items in batches
//       windowSize={5}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgrey',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default PostList;

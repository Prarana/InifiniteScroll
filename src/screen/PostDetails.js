import {StyleSheet, Text, View, ImageBackground, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Appbar, Switch} from 'react-native-paper';
import {useThemeContext} from '../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import { I18nManager } from 'react-native';


const PostDetails = ({route}) => {
  const {items} = route.params;   
  const {theme, toggleTheme} = useThemeContext();
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState('en-US');
  const isRTL = I18nManager.isRTL;
  console.log("@@@@@@ isRTL = "+isRTL);

  useEffect(() => {
    if (i18n.language === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
    console.log("@@@@ lang = "+i18n.language);
    setLanguage(i18n.language );
  }, [i18n.language]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header
          style={{
            elevation: 5,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 5,
            zIndex : 2
          }}>
          <Appbar.Content title={t('recipieDetails')} />
          <Switch value={theme.dark} onValueChange={toggleTheme} />
        </Appbar.Header>

      <ImageBackground
        style={styles.bgImg}
        source={{
            uri:'https://thumbs.dreamstime.com/z/healthy-food-cooking-background-space-your-text-vegetable-ingredients-fresh-garden-carrots-onions-pumpkins-ginger-spices-192691515.jpg?ct=jpeg'
        }}>
        <ScrollView style={[styles.flxMain, {backgroundColor: theme.colors.background}]}>
        <Image style={styles.image}
            source={{
              uri: items.image,
            }}
          />
          <View style={styles.flexName}>
            <Text style={[styles.detailsName, {color: theme.colors.text}]}>{items.name} </Text>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              {items.rating} ⭐
            </Text>
          </View>
          <View style={styles.flexName}>
            <Text style={[styles.itemCuisine, {color: theme.colors.text}]}>
              {items.cuisine}
            </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text}]}>
              {items.reviewCount} Reviews 
            </Text>
          </View>
          <View style={styles.flxSubMain}>
            <Text style={[styles.detailsTitle, { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }]}>{t('calories')}  : </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{items.caloriesPerServing}</Text>
          </View>
          <View style={styles.flxSubMain}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('preperationTime')}  : </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{items.prepTimeMinutes} minutes</Text>
          </View>

          <View style={styles.flxSubMain}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('cookingTime')}  : </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{items.cookTimeMinutes} minutes</Text>
          </View>

          <View style={styles.flxSubMain}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('servings') }  : </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{items.servings} people</Text>
          </View>
          <View style={styles.flxSubMain}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('difficultyLevel') } : </Text>
            <Text style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{items.difficulty}</Text>
          </View>
          <View style={styles.flxIngredients}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('ingredients')}  : </Text>
            <View style={[styles.flxIngredients, {left : "5%", marginTop:10}]}>
                {items.ingredients.map((item, index) => (
                    <Text key={index} style={[styles.detailsItem, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>
                        {index + 1}. {item}
                    </Text>
                ))}
            </View>
          </View>

          <View style={styles.flxIngredients}>
            <Text style={[styles.detailsTitle, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>{t('instructions')}  :</Text>
            <View style={[styles.flxIngredients, { left : "5%", marginTop:10}]}>
                {items.instructions.map((item, index) => (
                    <Text key={index} style={[styles.itemIngrediends, {color: theme.colors.text, textAlign: isRTL ? 'right' : 'left'}]}>
                        {index + 1}. {item}
                    </Text>
                ))}
            </View> 
          </View>
          
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
  },
  image: {
    width: '90%',
    height: 200,
    alignItems: 'center',
    left : "5%",
    top : "10"
  },
  title: {
    fontWeight: 900,
    fontSize: 18,
  },
  
  flexName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top : 30,
  },
  detailsName: {
    fontSize: 19,
    fontWeight: 900,
    marginBottom: 10,
    left : "5%",
    marginRight: 20,
  },
  flexCuisine: {
    flexDirection: 'row',
    alignItems: 'center',
    top : 30,
  },
  itemCuisine: {
    paddingVertical: 5,
    fontSize: 18,
    left : "5%",
    fontStyle: 'italic',
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: 700,
    top: 15,
    left : "5%",
    marginRight: 20,
  },
  flxSubMain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    width : "100%"
  },
  flxIngredients: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 25,
    //left : "5%",
    width:"130%"
  },
  itemIngrediends: {
    fontSize: 16,
    fontWeight: 400,
    top: 15,
    left : "1%",
    width : "50%",
    //marginRight: 50,
  },
  detailsItem: {
    fontSize: 16,
    fontWeight: 400,
    top: 15,
    left : "1%",
    marginRight: 20,
  },
  flxMain: {
    flex : 1,
    marginTop: 20,
    width: "95%",
    height: "100%",
    left: 10,
    backgroundColor: 'white',
    paddingVertical : 40
  },

});


// import {StyleSheet, Text, View, ImageBackground} from 'react-native';
// import React from 'react';
// import {Appbar, Switch} from 'react-native-paper';
// import {useThemeContext} from '../contexts/ThemeContext';

// const PostDetails = ({route}) => {
//   const {post} = route.params;
//   const {theme, toggleTheme} = useThemeContext();

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
//         <Appbar.Content
//           title="Welcome"
//         />
//         <Appbar.Action
//           icon="theme-light-dark"
//           onPress={toggleTheme}
//           color={theme.colors.text}
//         />
//         <Switch
//           value={theme.dark}
//           onValueChange={toggleTheme}
//           color={theme.colors.text} 
//         />
//       </Appbar.Header>

//       <ImageBackground
//         style={styles.bgImg}
//         source={{
//           uri: 'https://images.unsplash.com/photo-1531201890865-fb64780d16e9?q=80&w=2547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         }}>
//         <View style={[styles.flxMain, {backgroundColor: theme.colors.background}]}>
//           <View style={styles.flxSubMain}>
//             <Text style={[styles.detailsTitle, {color: theme.colors.text}]}>User ID  :  </Text>
//             <Text style={{color: theme.colors.text}}>{post.userId}</Text>
//           </View>

//           <View style={styles.flxSubMain}>
//             <Text style={[styles.detailsTitle, {color: theme.colors.text}]}>ID :  </Text>
//             <Text style={{color: theme.colors.text}}>{post.id}</Text>
//           </View>

//           <View style={styles.flxSubMain}>
//             <Text style={[styles.detailsTitle, {color: theme.colors.text}]}>Title  :  </Text>
//             <Text style={{color: theme.colors.text}}>{post.title}</Text>
//           </View>

//           <View style={styles.flxSubMain}>
//             <Text style={[styles.detailsTitle, {color: theme.colors.text}]}>Body  :  </Text>
//             <Text style={{color: theme.colors.text}}>{post.body}</Text>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default PostDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bgImg: {
//     flex: 1,
//   },
//   detailsTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     left: 10,
//     marginRight: 20,
//   },
//   detailsItem: {
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   flxSubMain: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   flxMain: {
//     justifyContent: 'flex-start',
//     marginTop: 20,
//     width: 390,
//     height: 350,
//     left: 10,
//     backgroundColor: 'white',
//   },
// });
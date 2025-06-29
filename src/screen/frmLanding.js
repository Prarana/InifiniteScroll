import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeContext} from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';


const frmLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigation = useNavigation();
  const {theme, toggleTheme} = useThemeContext();

  const {t, i18n} = useTranslation();

  const [language, setLanguage] = useState('en-US');
  const [key, setKey] = useState(0); // To force re-render

  // useEffect(() => {
  //   if (i18n.language === 'ar') {
  //     I18nManager.forceRTL(true);
  //     I18nManager.allowRTL(true);
  //   } else {
  //     I18nManager.forceRTL(false);
  //     I18nManager.allowRTL(false);
  //   }
  //   console.log("@@@@ lang = "+i18n.language);
  //   setLanguage(i18n.language);
  // }, [i18n.language]);

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en-US' ? 'ar' : 'en-US';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    setKey(prevKey => prevKey + 1);
    if (i18n.language === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
  };

  const onClickGetstarted = () => {
    navigation.navigate('PostList');
  };

  return (
    <View style={styles.container} key={key}>
      <ImageBackground
        style={styles.bgImg}
        source={{
          uri: 'https://thumbs.dreamstime.com/z/healthy-food-cooking-background-space-your-text-vegetable-ingredients-fresh-garden-carrots-onions-pumpkins-ginger-spices-192691515.jpg?ct=jpeg',
        }}>
        <TouchableOpacity
          style={styles.btnLetsStart}
          onPress={() => onClickGetstarted()}>
          <Text style={styles.txtLetsGetStarted}>{t('letsGetStarted')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLetsStart} onPress={changeLanguage}>
          <Text style={styles.txtLanguageChange}>{t('changeLanguage')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLetsStart: {
    padding: 10,
    backgroundColor: '#700000',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 1,
    marginTop : 20
  },
  btnLanguageChange : {
    padding: 10,
    backgroundColor: '#900000',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 1,
  },
  txtLetsGetStarted: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtLanguageChange :{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  box: {
    marginTop: 30,
    //padding: 10,
    borderRadius: 10,
    width : "100%"
  },
});

export default frmLanding;


// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   I18nManager,
// } from 'react-native';
// import {useTranslation} from 'react-i18next';
// import {useThemeContext} from '../contexts/ThemeContext';
// import { useNavigation } from '@react-navigation/native';
// import {Provider} from 'react-redux';
// import mystore from '../redux/mystore';

// const frmLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const navigation = useNavigation();
//   const {theme, toggleTheme} = useThemeContext();

//   const {t, i18n} = useTranslation();

//   const [language, setLanguage] = useState('en-US');
//   const [key, setKey] = useState(0); // To force re-render

//   useEffect(() => {
//     if (i18n.language === 'ar') {
//       I18nManager.forceRTL(true);
//       I18nManager.allowRTL(true);
//     } else {
//       I18nManager.forceRTL(false);
//       I18nManager.allowRTL(false);
//     }
//     console.log("@@@@ lang = "+i18n.language);
//     setLanguage(i18n.language );
//   }, [i18n.language]);

//   const changeLanguage = () => {
//     const newLanguage = i18n.language === 'en-US' ? 'ar' : 'en-US';
//     i18n.changeLanguage(newLanguage);
//     setLanguage(newLanguage);
//     setKey(prevKey => prevKey + 1);
//   };

//   const onClickGetstarted = () => {
//     navigation.navigate('PostList');
//   };

//   return (
//     <View
//       style={[styles.container, {backgroundColor: theme.colors.background}]}
//       key={key}>

//       <ImageBackground
//         style={styles.bgImg}
//         source={{
//           uri:'https://thumbs.dreamstime.com/z/healthy-food-cooking-background-space-your-text-vegetable-ingredients-fresh-garden-carrots-onions-pumpkins-ginger-spices-192691515.jpg?ct=jpeg'
//         }}>
//         {!isVisible && (
//           <View>
//             <TouchableOpacity
//               style={styles.btnLetsStart}
//               // onPress={toggleVisibility}>
//               onPress={() => onClickGetstarted()}>
//               <Text style={styles.txtLetsGetStarted}>
//                 {t('letsGetStarted')}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btnLetsStart}
//               onPress={changeLanguage}>
//               <Text style={styles.txtLanguageChange}>
//                 {t('changeLanguage')}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         <Provider store={mystore}>

//         </Provider>
//         {/* {isVisible && (
//           <View style={styles.box}>
//             <Provider store={mystore}>
//               <Appbar.Header style={{width:"100%", flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',}}>
//                   <Appbar.Content title={t('welcome')} />
//                   <Switch value={theme.dark} onValueChange={toggleTheme} />
//               </Appbar.Header>

//               <PostList />

//             </Provider>
//           </View>
//         )} */}
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bgImg: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnLetsStart: {
//     padding: 10,
//     backgroundColor: '#700000',
//     width: 300,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     opacity: 1,
//     marginTop : 20
//   },
//   btnLanguageChange : {
//     padding: 10,
//     backgroundColor: '#900000',
//     width: 300,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     opacity: 1,
//   },
//   txtLetsGetStarted: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   txtLanguageChange :{
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   box: {
//     marginTop: 30,
//     //padding: 10,
//     borderRadius: 10,
//     width : "100%"
//   },
// });

// export default frmLanding;


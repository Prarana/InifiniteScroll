// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      posts: "Posts",
      letsGetStarted : "Let's get started",
      changeLanguage : "Change language to Arabic",
      recipieList : "Recipie List",
      recipieDetails : "Recipie Details",
      calories : "Calories",
      preperationTime : "Preperation Time",
      cookingTime : "Cooking Time",
      servings : "Servings",
      difficultyLevel : "Difficulty Level",
      ingredients : "Ingredients",
      instructions : "Steps of how to cook",
      reviews : "Reviews"
    }
  },
  ar: {
    translation: {
      welcome: "أهلا وسهلا",
      posts: "المشاركات",
      letsGetStarted : "لنبدأ",
      changeLanguage : "تغيير اللغة الى الانجليزية",
      recipieList : "قائمة الوصفات",
      recipieDetails : "تفاصيل الوصفة",
      calories : "سعرات حرارية",
      preperationTime : "وقت التحضير",
      cookingTime : "وقت الطبخ",
      servings : "حصص",
      difficultyLevel : "مستوى الصعوبة",
      ingredients : "مكونات",
      instructions : "خطوات الطبخ",
      reviews : "التعليقات"

    }
  },
};

const locales = RNLocalize.getLocales();
const language = locales[0]?.languageTag; 

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language || 'en-US', 
    fallbackLng: 'en-US', 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;

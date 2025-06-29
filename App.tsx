// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider} from './src/contexts/ThemeContext';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/contexts/i18n';
import HomeScreen from './src/screen/HomeScreen';
import {
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import mystore from './src/redux/mystore';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <PaperProvider>
        <Provider store={mystore}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          </Provider>
        </PaperProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

// return (
//   <View>
//     <HomeScreen>
//     </HomeScreen>
//   </View>
// )

export default App;

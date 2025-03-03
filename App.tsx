import React, { useState } from 'react';
import { Provider } from 'react-redux';
import mystore from './src/redux/mystore';
import PostList from './src/components/PostList';
import { View, TouchableHighlight, Text, StyleSheet, ImageBackground } from 'react-native';

const App = () => {

  const [isVisible, setIsVisible] = useState(false); 
  const toggleVisibility = () => { 
    setIsVisible(!isVisible); 
  };

  return (
    
    <ImageBackground
    style={styles.bgImg}
    source = {{uri:"https://images.unsplash.com/photo-1531201890865-fb64780d16e9?q=80&w=2547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
    >

      {!isVisible && ( 
        <TouchableHighlight style={styles.btnLetsStart} onPress={toggleVisibility} >
        <Text style={styles.txtLetsGetStarted}>Lets Get Started!!!</Text>
      </TouchableHighlight>
      )} 
      
      {isVisible && ( 
        <View style={styles.box}> 
          <Provider store={mystore}>
            <PostList />
          </Provider>
      </View> 
      )} 
 </ImageBackground>
      
    
  );
};

export default App;


const styles = StyleSheet.create({ 
  btnLetsStart : {
    opacity: 100, 
    padding:10, 
    backgroundColor:"#4e6f6b",
    width: 300,
    height : 60,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius : 10,
  },
  txtLetsGetStarted:{
    fontSize  : 20,
    fontWeight : "bold",
    color : "#fff"
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  box: { 
    marginTop: 10, 
    padding: 10, 
    backgroundColor: 'lightblue', 
    borderRadius: 10, 
  }, 
  bgImg : { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',  
  }
}); 


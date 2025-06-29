import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import frmLanding from '../screen/frmLanding';
import PostDetails from '../screen/PostDetails';
import PostList from '../screen/PostList';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name = "HomeScreen" component={HomeScreen}/> */}
      <Stack.Screen name="frmLanding" component={frmLanding} />
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
}

export default AppNavigator;



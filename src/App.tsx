import React from 'react';
import PostsList from './features/posts/PostsList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PostList" component={PostsList} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

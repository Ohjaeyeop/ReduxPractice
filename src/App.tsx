import React from 'react';
import PostsList from './features/posts/PostsList';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AddPostForm from './features/posts/AddPostForm';

type RootStackParamList = {
  PostsList: undefined;
  AddPost: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, 'PostsList'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#774ABC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Redux Essentials Example',
        }}>
        <Stack.Screen name="PostsList" component={PostsList} />
        <Stack.Screen name="AddPost" component={AddPostForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

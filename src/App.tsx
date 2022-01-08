import React from 'react';
import PostsList from './features/posts/PostsList';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';

type RootStackParamList = {
  PostsList: undefined;
  AddPost: undefined;
  SinglePost: {postId: string};
  EditPost: {postId: string};
};

export type PostsListProps = NativeStackScreenProps<
  RootStackParamList,
  'PostsList'
>;

export type SinglePostProps = NativeStackScreenProps<
  RootStackParamList,
  'SinglePost'
>;

export type AddPostProps = NativeStackScreenProps<
  RootStackParamList,
  'AddPost'
>;

export type EditPostProps = NativeStackScreenProps<
  RootStackParamList,
  'EditPost'
>;

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
        <Stack.Screen name="SinglePost" component={SinglePostPage} />
        <Stack.Screen name="EditPost" component={EditPostForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

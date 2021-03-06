import React, {useEffect, useState} from 'react';
import PostsList from './features/posts/PostsList';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import {makeServer} from './api/server';
import auth from '@react-native-firebase/auth';
import SignInForm from './features/users/SignInForm';
import SignUpForm from './features/users/SignUpForm';
import {useUser} from './contexts/userContext';
import MyPostsList from './features/users/MyPostsList';

declare global {
  interface Window {
    server: any;
  }
}

if (process.env.NODE_ENV === 'development') {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

type RootStackParamList = {
  PostsList: undefined;
  AddPost: undefined;
  SinglePost: {postId: string};
  EditPost: {postId: string};
  SignIn: undefined;
  SignUp: undefined;
  MyPostsList: undefined;
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

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type LogInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type MyPostsListProps = NativeStackScreenProps<
  RootStackParamList,
  'MyPostsList'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const {setUser} = useUser();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

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
        <Stack.Screen name="SignIn" component={SignInForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="MyPostsList" component={MyPostsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

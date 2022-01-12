import React from 'react';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyPostsListProps} from '../../App';

const MyPostsList = ({navigation}: MyPostsListProps) => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('PostsList');
      });
  };
  return (
    <View>
      <Button title="Sign Out" color="#774ABC" onPress={signOut} />
    </View>
  );
};

export default MyPostsList;

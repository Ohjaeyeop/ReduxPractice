import React from 'react';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyPostsListProps} from '../../App';
import {useUser} from '../../contexts/userContext';

const MyPostsList = ({navigation}: MyPostsListProps) => {
  const {user} = useUser();
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('PostsList');
      });
  };
  const displayName = user.email.split('@')[0];
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <Text style={{fontSize: 18, color: '#774ABC', paddingTop: 8}}>
          {displayName} 님
        </Text>
        <View>
          <Button title="Sign Out" color="#774ABC" onPress={signOut} />
        </View>
      </View>
    </View>
  );
};

export default MyPostsList;

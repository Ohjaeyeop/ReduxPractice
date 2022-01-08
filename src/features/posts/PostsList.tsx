import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {View, Text, FlatList, SafeAreaView, Button} from 'react-native';
import {PostState} from './postsSlice';

const PostsList = ({navigation}) => {
  const posts = useAppSelector(state => state.posts);

  const renderPosts = ({item}: {item: PostState}) => (
    <View
      style={{
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 10}}>
        {item.title}
      </Text>
      <Text style={{marginBottom: 10}}>{item.content}</Text>
    </View>
  );

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
        Posts
      </Text>
      <FlatList data={posts} renderItem={renderPosts} />
      <Button title="Add Post" onPress={() => navigation.navigate('AddPost')} />
    </View>
  );
};

export default PostsList;

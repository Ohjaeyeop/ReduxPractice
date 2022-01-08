import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {View, Text, FlatList, SafeAreaView} from 'react-native';

const PostsList = () => {
  const posts = useAppSelector(state => state.posts);

  const renderPosts = ({item}) => (
    <SafeAreaView>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
    </SafeAreaView>
  );

  return (
    <View>
      <Text>Posts</Text>
      <FlatList data={posts} renderItem={renderPosts} />
    </View>
  );
};

export default PostsList;

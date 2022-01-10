import React from 'react';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import {Button, FlatList, TouchableOpacity, View, Text} from 'react-native';
import {PostState} from './postsSlice';
import TimeAgo from './TimeAgo';
import {useNavigation} from '@react-navigation/native';
import {PostsListProps} from '../../App';

const PostExcerpt = ({posts}: {posts: PostState[]}) => {
  const navigation = useNavigation<PostsListProps['navigation']>();
  const renderPosts = ({item}: {item: PostState}) => (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('SinglePost', {postId: item.id})}>
      <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
      <Text style={{marginBottom: 10}}>
        <PostAuthor userId={item.user} />
        <TimeAgo timestamp={item.date} />
      </Text>
      <Text style={{marginBottom: 15}} numberOfLines={2}>
        {item.content}
      </Text>
      <ReactionButtons post={item} />
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'justify',
            padding: 8,
          }}>
          Posts
        </Text>
        <Button title="+" onPress={() => navigation.navigate('AddPost')} />
      </View>
      <FlatList data={posts} renderItem={renderPosts} />
    </View>
  );
};

export default PostExcerpt;

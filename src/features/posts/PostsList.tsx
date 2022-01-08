import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {View, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import {PostState} from './postsSlice';
import {PostsListProps} from '../../App';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = ({navigation}: PostsListProps) => {
  const posts = useAppSelector(state => state.posts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = ({item}: {item: PostState}) => (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('SinglePost', {postId: item.id})}>
      <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
      <PostAuthor userId={item.user} />
      <TimeAgo timestamp={item.date} />
      <Text style={{marginBottom: 15}}>{item.content}</Text>
      <ReactionButtons post={item} />
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
        Posts
      </Text>
      <FlatList data={orderedPosts} renderItem={renderPosts} />
      <Button title="Add Post" onPress={() => navigation.navigate('AddPost')} />
    </View>
  );
};

export default PostsList;

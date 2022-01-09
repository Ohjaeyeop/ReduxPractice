import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {View, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import {PostState, selectAllPosts} from './postsSlice';
import {PostsListProps} from '../../App';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = ({navigation}: PostsListProps) => {
  const posts = useAppSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

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
    <View style={{flex: 1, padding: 15}}>
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
      <FlatList data={orderedPosts} renderItem={renderPosts} />
    </View>
  );
};

export default PostsList;

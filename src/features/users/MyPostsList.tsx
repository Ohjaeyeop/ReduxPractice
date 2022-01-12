import React from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyPostsListProps} from '../../App';
import {UserType, useUser} from '../../contexts/userContext';
import {createSelector} from '@reduxjs/toolkit';
import {PostState, selectAllPosts} from '../posts/postsSlice';
import PostAuthor from '../posts/PostAuthor';
import TimeAgo from '../posts/TimeAgo';
import ReactionButtons from '../posts/ReactionButtons';
import {useAppSelector} from '../../app/hooks';

const MyPostsList = ({navigation}: MyPostsListProps) => {
  const {user} = useUser();
  const selectPostsByUser = createSelector([selectAllPosts], posts =>
    posts.filter(post => post.user === user?.email),
  );
  const posts = useAppSelector(state => selectPostsByUser(state));

  const renderPosts = ({item}: {item: PostState}) => (
    <TouchableOpacity
      style={{
        marginBottom: 25,
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

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('PostsList');
      });
  };
  const displayName = user?.email.split('@')[0];
  return (
    <View style={{flex: 1, paddingHorizontal: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 15,
        }}>
        <Text style={{fontSize: 18, paddingTop: 8}}>{displayName} 님</Text>
        <View>
          <Button title="Sign Out" color="black" onPress={signOut} />
        </View>
      </View>
      <FlatList data={posts} renderItem={renderPosts} />
    </View>
  );
};

export default MyPostsList;

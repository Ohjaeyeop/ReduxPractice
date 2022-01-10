import React from 'react';
import {SinglePostProps} from '../../App';
import {useAppSelector} from '../../app/hooks';
import {View, Text, Button} from 'react-native';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import {selectPostById} from './postsSlice';

const SinglePostPage = ({navigation, route}: SinglePostProps) => {
  const {postId} = route.params;

  const post = useAppSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <View>
        <Text>Post not found!</Text>
      </View>
    );
  }

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
        {post.title}
      </Text>
      <Text style={{marginBottom: 15}}>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </Text>
      <Text style={{fontSize: 15, marginBottom: 20}}>{post.content}</Text>
      <ReactionButtons post={post} />
      <Button
        title="Edit Post"
        onPress={() => navigation.navigate('EditPost', {postId})}
      />
    </View>
  );
};

export default SinglePostPage;

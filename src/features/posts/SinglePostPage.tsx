import React from 'react';
import {SinglePostProps} from '../../App';
import {useAppSelector} from '../../app/hooks';
import {View, Text, Button} from 'react-native';
import PostAuthor from './PostAuthor';

const SinglePostPage = ({navigation, route}: SinglePostProps) => {
  const {postId} = route.params;

  const post = useAppSelector(state =>
    // eslint-disable-next-line @typescript-eslint/no-shadow
    state.posts.find(post => post.id === postId),
  );

  if (!post) {
    return (
      <View>
        <Text>Post not found!</Text>
      </View>
    );
  }

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{post.title}</Text>
      <PostAuthor userId={post.user} />
      <Text>{post.content}</Text>
      <Button
        title="Edit Post"
        onPress={() => navigation.navigate('EditPost', {postId})}
      />
    </View>
  );
};

export default SinglePostPage;

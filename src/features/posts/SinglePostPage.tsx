import React from 'react';
import {SinglePostProps} from '../../App';
import {useAppSelector} from '../../app/hooks';
import {View, Text, Button} from 'react-native';

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
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>
        {post.title}
      </Text>
      <Text>{post.content}</Text>
      <Button
        title="Edit Post"
        onPress={() => navigation.navigate('EditPost', {postId})}
      />
    </View>
  );
};

export default SinglePostPage;

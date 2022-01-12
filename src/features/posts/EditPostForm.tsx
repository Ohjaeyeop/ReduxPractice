import React, {useState} from 'react';
import {EditPostProps} from '../../App';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Button, Text, TextInput, View} from 'react-native';
import {PostState, postUpdated, selectPostById} from './postsSlice';

const EditPostForm = ({navigation, route}: EditPostProps) => {
  const {postId} = route.params;

  const post = useAppSelector(state =>
    selectPostById(state, postId),
  ) as PostState;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useAppDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
          date: post.date,
          reactions: post.reactions,
        }),
      );
      navigation.navigate('SinglePost', {postId});
    }
  };

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
        Add a New Post
      </Text>
      <Text style={{fontSize: 15, marginBottom: 10}}>Post Title:</Text>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          marginBottom: 15,
          borderRadius: 5,
          borderColor: 'gray',
          padding: 5,
        }}
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <Text style={{fontSize: 15, marginBottom: 10}}>Content:</Text>
      <TextInput
        style={{
          height: 150,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'gray',
          padding: 5,
          marginBottom: 15,
        }}
        multiline={true}
        onChangeText={text => setContent(text)}
        value={content}
      />
      <Button title="Save Post" color="#774ABC" onPress={onSavePostClicked} />
    </View>
  );
};

export default EditPostForm;

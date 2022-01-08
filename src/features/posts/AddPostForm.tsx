import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useAppDispatch} from '../../app/hooks';
import {postAdded} from './postsSlice';
import {nanoid} from '@reduxjs/toolkit';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded({id: nanoid(), title, content}));
    }
    setTitle('');
    setContent('');
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
          height: 100,
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
      <Button title="Save Post" onPress={onSavePostClicked} />
    </View>
  );
};

export default AddPostForm;

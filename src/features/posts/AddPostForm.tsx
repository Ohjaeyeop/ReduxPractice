import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
        }}
        multiline={true}
        onChangeText={text => setContent(text)}
        value={content}
      />
    </View>
  );
};

export default AddPostForm;
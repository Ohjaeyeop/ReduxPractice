import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../../app/hooks';
import {addNewPost} from './postsSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {useUser} from '../../contexts/userContext';

const AddPostForm = ({
  onSaveClick,
}: {
  onSaveClick: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const {user} = useUser();

  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(
          addNewPost({title, content, user: user.email}),
        );

        unwrapResult(resultAction);
        setTitle('');
        setContent('');
      } catch (err) {
        console.log('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
        onSaveClick(false);
      }
    }
  };

  return (
    <View style={{padding: 15}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
          Add a New Post
        </Text>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => onSaveClick(false)}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>X</Text>
        </TouchableOpacity>
      </View>
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
      <Button
        title="Save Post"
        color="#774ABC"
        onPress={onSavePostClicked}
        disabled={!canSave}
      />
    </View>
  );
};

export default AddPostForm;

import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postAdded} from './postsSlice';
import {AddPostProps} from '../../App';
import RNPickerSelect from 'react-native-picker-select';

const AddPostForm = ({navigation}: AddPostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users);

  const onAuthorChanged = (value: string) => setUserId(value);

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
      navigation.navigate('PostsList');
    }
  };

  const pickerItems = users.map(user => ({label: user.name, value: user.id}));

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
      <Text style={{fontSize: 15, marginBottom: 10}}>Author: </Text>
      <RNPickerSelect
        onValueChange={onAuthorChanged}
        items={pickerItems}
        style={pickerSelectStyles}
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
        onPress={onSavePostClicked}
        disabled={!canSave}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 10,
    color: '#000000',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default AddPostForm;

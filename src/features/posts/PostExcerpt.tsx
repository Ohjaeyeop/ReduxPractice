import React from 'react';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import {Button, FlatList, TouchableOpacity, View, Text} from 'react-native';
import {PostState} from './postsSlice';
import TimeAgo from './TimeAgo';
import {useNavigation} from '@react-navigation/native';
import {PostsListProps} from '../../App';
import {useUser} from '../../contexts/userContext';
import auth from '@react-native-firebase/auth';

const PostExcerpt = ({posts}: {posts: PostState[]}) => {
  const navigation = useNavigation<PostsListProps['navigation']>();
  const {user} = useUser();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('logout'));
  };

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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
          paddingHorizontal: 15,
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
        {user ? (
          <Button title="Sign Out" onPress={signOut} />
        ) : (
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
          />
        )}
      </View>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        style={{paddingHorizontal: 15}}
      />
    </View>
  );
};

export default PostExcerpt;

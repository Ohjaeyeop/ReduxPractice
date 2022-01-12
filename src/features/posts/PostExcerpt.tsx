import React, {useState} from 'react';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import {
  Button,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Modal,
  SafeAreaView,
} from 'react-native';
import {PostState} from './postsSlice';
import TimeAgo from './TimeAgo';
import {useNavigation} from '@react-navigation/native';
import {PostsListProps} from '../../App';
import {useUser} from '../../contexts/userContext';
import AddPostForm from './AddPostForm';

const PostExcerpt = ({posts}: {posts: PostState[]}) => {
  const navigation = useNavigation<PostsListProps['navigation']>();
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useUser();

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
        {user ? (
          <Button
            title="My Page"
            color="black"
            onPress={() => {
              navigation.navigate('MyPostsList');
            }}
          />
        ) : (
          <Button
            title="Sign In"
            color="#774ABC"
            onPress={() => navigation.navigate('SignIn')}
          />
        )}
      </View>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        style={{paddingHorizontal: 15}}
      />
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView>
          <AddPostForm onSaveClick={setModalVisible} />
        </SafeAreaView>
      </Modal>
      {user && (
        <View style={{padding: 10, marginBottom: 20}}>
          <Button
            title="Add Post"
            color="#774ABC"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      )}
    </View>
  );
};

export default PostExcerpt;

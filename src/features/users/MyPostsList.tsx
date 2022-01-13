import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyPostsListProps} from '../../App';
import {useUser} from '../../contexts/userContext';
import {createSelector} from '@reduxjs/toolkit';
import {PostState, selectAllPosts} from '../posts/postsSlice';
import PostAuthor from '../posts/PostAuthor';
import TimeAgo from '../posts/TimeAgo';
import {useAppSelector} from '../../app/hooks';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {Animated, StyleSheet} from 'react-native';

const MyPostsList = ({navigation}: MyPostsListProps) => {
  const {user} = useUser();
  const selectPostsByUser = createSelector([selectAllPosts], posts =>
    posts.filter(post => post.user === user?.email),
  );
  const posts = useAppSelector(state => selectPostsByUser(state));

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <Animated.View style={[styles.actionIcon, {transform: [{scale}]}]} />
      </RectButton>
    );
  };

  const renderPosts = ({item}: {item: PostState}) => (
    <Swipeable
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <RectButton
        style={{
          flex: 1,
          height: 80,
          paddingVertical: 10,
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
        <Text style={{marginBottom: 10}}>
          <PostAuthor userId={item.user} />
          <TimeAgo timestamp={item.date} />
        </Text>
        <Text style={{marginBottom: 15}} numberOfLines={2}>
          {item.content}
        </Text>
      </RectButton>
    </Swipeable>
  );

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('PostsList');
      });
  };
  const displayName = user?.email.split('@')[0];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <Text style={{fontSize: 18, paddingTop: 8}}>{displayName} 님</Text>
        <View>
          <Button title="Sign Out" color="black" onPress={signOut} />
        </View>
      </View>
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderPosts}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: 'plum',
    height: 20,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 0.5,
  },
});

export default MyPostsList;

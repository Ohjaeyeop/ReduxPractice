import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PostState, reactionAdded, ReactionType} from './postsSlice';
import {useAppDispatch} from '../../app/hooks';
import {useUser} from '../../contexts/userContext';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

const ReactionButtons = ({post}: {post: PostState}) => {
  const dispatch = useAppDispatch();
  const {user} = useUser();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <TouchableOpacity
        onPress={() =>
          dispatch(
            reactionAdded({postId: post.id, reaction: name as ReactionType}),
          )
        }
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          width: 45,
          padding: 2,
          marginRight: 5,
        }}
        key={name}
        disabled={user === null}>
        <Text>
          {emoji} {post.reactions[name as ReactionType]}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      {reactionButtons}
    </View>
  );
};

export default ReactionButtons;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PostState, reactionAdded} from './postsSlice';
import {useAppDispatch} from '../../app/hooks';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

const ReactionButtons = ({post}: {post: PostState}) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <TouchableOpacity
        onPress={() =>
          dispatch(reactionAdded({postId: post.id, reaction: name}))
        }
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          width: 45,
          padding: 2,
          marginRight: 5,
        }}
        key={name}>
        <Text>
          {emoji} {post.reactions[name]}
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

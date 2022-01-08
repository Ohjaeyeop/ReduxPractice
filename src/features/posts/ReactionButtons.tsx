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
        }>
        <Text>
          {emoji} {post.reactions[name]}
        </Text>
      </TouchableOpacity>
    );
  });
  return <View>{reactionButtons}</View>;
};

export default ReactionButtons;

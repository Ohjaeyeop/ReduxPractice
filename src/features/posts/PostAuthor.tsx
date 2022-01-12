import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {Text} from 'react-native';

const PostAuthor = ({userId}: {userId: string | undefined}) => {
  return (
    <Text style={{fontSize: 12}}>
      by {userId ? userId.split('@')[0] : 'unknown'}
    </Text>
  );
};

export default PostAuthor;

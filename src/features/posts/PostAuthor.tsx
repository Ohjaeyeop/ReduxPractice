import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {Text} from 'react-native';

const PostAuthor = ({userId}: {userId: string | undefined}) => {
  const author = useAppSelector(state =>
    state.users.find(user => user.id === userId),
  );
  return (
    <Text style={{fontSize: 12, marginBottom: 10}}>
      by {author ? author.name : 'Unknown author'}
    </Text>
  );
};

export default PostAuthor;

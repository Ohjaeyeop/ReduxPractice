import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Text} from 'react-native';
import {fetchPosts, selectAllPosts} from './postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(state => state.posts.status);
  const error = useAppSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <Text>Loading...</Text>;
  } else if (postStatus === 'succeeded') {
    content = <PostExcerpt posts={posts} />;
  } else if (postStatus === 'failed') {
    content = <Text>{error}</Text>;
  }

  return <>{content}</>;
};
export default PostsList;

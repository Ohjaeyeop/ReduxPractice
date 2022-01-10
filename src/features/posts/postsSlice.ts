import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PostState {
  id: string;
  title: string;
  content: string;
  user?: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}

export type ReactionType = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

interface StateType {
  posts: PostState[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: StateType = {
  posts: [],
  status: 'idle',
  error: undefined,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('/fakeApi/posts');
  const response = await res.json();
  return response.posts;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: {title: string; content: string; user: string}) => {
    const res = await fetch('/fakeApi/posts', {
      method: 'POST',
      body: JSON.stringify(initialPost),
    });
    const response = await res.json();
    return response.post;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostState>) {
      const {id, title, content} = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{postId: string; reaction: ReactionType}>,
    ) {
      const {postId, reaction} = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading';
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      }),
      builder.addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }),
      builder.addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const {postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find(post => post.id === postId);

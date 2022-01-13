import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PostState {
  id: string;
  title: string;
  content: string;
  user?: string;
  date: string;
  reactions: ReactionObjType;
}

type ReactionObjType = {
  [index in ReactionType]: {
    count: number;
    users: string[];
  };
};
export type ReactionType = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

interface StateType {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const postsAdapter = createEntityAdapter<PostState>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState<StateType>({
  status: 'idle',
  error: undefined,
});

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

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string) => {
    const res = await fetch(`/fakeApi/posts/${id}`, {
      method: 'DELETE',
    });
    const response = await res.json();
    return response.id;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostState>) {
      const {id, title, content} = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: ReactionType;
        user: string;
      }>,
    ) {
      const {postId, reaction, user} = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        const reactionObj = existingPost.reactions[reaction];
        if (reactionObj.users.includes(user)) {
          reactionObj.count--;
          reactionObj.users = reactionObj.users.filter(value => value !== user);
        } else {
          reactionObj.count++;
          reactionObj.users.push(user);
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      postsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
    builder.addCase(deletePost.fulfilled, postsAdapter.removeOne);
  },
});

export const {postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;

export const {selectAll: selectAllPosts, selectById: selectPostById} =
  postsAdapter.getSelectors((state: RootState) => state.posts);

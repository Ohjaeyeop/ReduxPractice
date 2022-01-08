import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PostState {
  id: string;
  title: string;
  content: string;
}

const initialState: PostState[] = [
  {id: '1', title: 'First Post!', content: 'Hello!'},
  {id: '2', title: 'Second Post', content: 'More text'},
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<PostState>) {
      state.push(action.payload);
    },
    postUpdated(state, action: PayloadAction<PostState>) {
      const {id, title, content} = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const {postAdded, postUpdated} = postsSlice.actions;

export default postsSlice.reducer;

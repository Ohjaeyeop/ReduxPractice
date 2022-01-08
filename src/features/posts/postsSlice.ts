import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {sub} from 'date-fns';

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

const initialReactions: PostState['reactions'] = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

const initialState: PostState[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), {minutes: 10}).toISOString(),
    reactions: initialReactions,
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), {minutes: 5}).toISOString(),
    reactions: initialReactions,
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostState>) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions,
          },
        };
      },
    },
    postUpdated(state, action: PayloadAction<PostState>) {
      const {id, title, content} = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{postId: string; reaction: string}>,
    ) {
      const {postId, reaction} = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;

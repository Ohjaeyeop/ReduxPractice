import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface UsersType {
  id: string;
  name: string;
}

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/fakeApi/users');
  return response.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;

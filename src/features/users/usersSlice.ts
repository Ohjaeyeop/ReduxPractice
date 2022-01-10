import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface UsersType {
  id: string;
  name: string;
}

const initialState = [] as UsersType[];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('/fakeApi/users');
  const response = await res.json();
  return response.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;

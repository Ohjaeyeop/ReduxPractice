import {createSlice} from '@reduxjs/toolkit';

interface UsersType {
  id: string;
  name: string;
}

const initialState: UsersType[] = [
  {id: '0', name: 'Kim'},
  {id: '1', name: 'Oh'},
  {id: '2', name: 'Park'},
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default userSlice.reducer;

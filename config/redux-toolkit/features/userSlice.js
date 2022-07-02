import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  fullname: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
};

const userSlice = createSlice({
  // name: 'userAuthDetails',
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const {login, logout} = userSlice.actions;

//selectors
export const selectUser = state => state.user.user;

export default userSlice.reducer;

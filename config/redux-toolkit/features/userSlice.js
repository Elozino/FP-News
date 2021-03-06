import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  fullname: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  initializing: true,
  isLogged: '',
  isError: false,
  errorMessage: '',
};

const userSlice = createSlice({
  // name: 'userAuthDetails',
  name: 'user',
  initialState,
  reducers: {
    fullname: (state, action) => {
      state.fullname = action.payload;
    },
    phoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    username: (state, action) => {
      state.username = action.payload;
    },
    password: (state, action) => {
      state.password = action.payload;
    },
    email: (state, action) => {
      state.email = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    initializing: (state, action) => {
      state.user = action.payload;
    },
    isLogged: state => {
      state.user = null;
    },
  },
});

export const {
  fullname,
  phoneNumber,
  username,
  password,
  email,
  initializing,
  isLogged,
} = userSlice.actions;

//selectors
export const userFieldSelector = state => state.user;

export default userSlice.reducer;

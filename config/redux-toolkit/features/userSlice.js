import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  fullname: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
};

const userSlice = createSlice({
  name: 'userAuthDetails',
  initialState,
});

export default userSlice.reducer;

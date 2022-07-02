import {createSlice} from '@reduxjs/toolkit';
import {newsApi} from '../api/NewsApi';

const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'newsData',
  initialState,
  reducers: {
    populateNews: state => {
      return (news = newsApi());
    },
  },
});

export const {populateNews} = newsSlice.actions;

export default newsSlice.reducer;

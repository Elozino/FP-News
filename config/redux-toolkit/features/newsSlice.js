// slices/items.js
// -------------------------------------------------------------
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
export const initialState = {
  loading: false,
  error: false,
  news: [],
};

// our slice
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setItems: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.news = payload;
    },
    setError: state => {
      state.error = true;
    },
  },
});

// export the actions
export const {setLoading, setItems, setError} = newsSlice.actions;

// export the selector (".news" being same as in slices/index.js's "news: something")
export const itemsSelector = state => state.news;

// export the default reducer
export default newsSlice.reducer;

const options = {
  method: 'GET',
  url: 'https://free-news.p.rapidapi.com/v1/search',
  params: {q: 'Elon Musk', lang: 'en'},
  headers: {
    'X-RapidAPI-Key': '09703e6698mshf43e2b477fb9b7bp1cab0djsn52091d834332',
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
  },
};

// fetch all news
export function fetchNews() {
  return dispatch => {
    axios
      .request(options)
      .then(response => {
        dispatch(setItems(response.data));
      })
      .catch(er => {
        dispatch(setError());
      });
  };
}

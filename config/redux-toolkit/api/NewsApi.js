import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://free-news.p.rapidapi.com/v1/search',
  params: {q: 'Elon Musk', lang: 'en'},
  headers: {
    'X-RapidAPI-Key': '09703e6698mshf43e2b477fb9b7bp1cab0djsn52091d834332',
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
  },
};

export const newsApi = async () => {
  await axios
    .request(options)
    .then(function (response) {
      console.log("newsapi", response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

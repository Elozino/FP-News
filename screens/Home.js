import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
// import {newsApi} from '../config/redux-toolkit/api/NewsApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

const Home = () => {
  const {news, populateNews} = useSelector(state => state.news);
  const dispatch = useDispatch();

  const options = {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: {q: 'Elon Musk', lang: 'en'},
    headers: {
      'X-RapidAPI-Key': '09703e6698mshf43e2b477fb9b7bp1cab0djsn52091d834332',
      'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
    },
  };

  const newsAi = async () => {
    await axios
      .request(options)
      .then(function (response) {
        // console.log('newaiFunc', response.data);
        console.log(response.data);
        // response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // const data = newsAi();
  // console.log({data});

  useEffect(() => {
    // dispatch(populateNews);
    newsAi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Good day!</Text>
          <Text style={styles.username}>Elozino</Text>
        </View>
        <TouchableOpacity style={styles.refresh}>
          <Ionicons name="refresh" size={30} />
        </TouchableOpacity>
      </View>
      <Text style={styles.newsText}>News</Text>
     
   
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  refresh: {
    backgroundColor: COLORS.lightgrey,
    padding: 5,
    borderRadius: 5,
    opacity: 0.5,
  },
  newsText: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 10,
  },
});

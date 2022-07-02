import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNews,
  itemsSelector,
} from '../config/redux-toolkit/features/newsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';
import NewsListing from '../components/NewsListing';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  // fetch data from our store
  const {loading, error, news} = useSelector(itemsSelector);
  // console.log(loading, error, news);
  // hook to fetch items
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Good day!</Text>
          <Text style={styles.username}>Elozino</Text>
        </View>
        <TouchableOpacity style={styles.refresh}>
          <Text>Logout</Text>
          {/* <Ionicons name="refresh" size={30} /> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.newsText}>News</Text>
      {/* <ScrollView>
        <Text>
          {news.articles.map(article => (
            <NewsListing newsData={article} navigation={navigation} />
          ))}
        </Text>
      </ScrollView> */}
      <FlatList
        data={news.articles}
        renderItem={({item}) => (
          <NewsListing newsData={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 10,
        }}
      />
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

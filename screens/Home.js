import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNews,
  itemsSelector,
} from '../config/redux-toolkit/features/newsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';
import NewsListing from '../components/NewsListing';
import {firebaseAuth} from '../config/firebase/firebaseConfig';
import {userFieldSelector} from '../config/redux-toolkit/features/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getDocs} from 'firebase/firestore';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  // fetch data from our store
  const {news} = useSelector(itemsSelector);
  const userInfo = useSelector(userFieldSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        console.log('User signed out!');
      });
  };

  const fetch = async () => {
    const user = auth().currentUser;
    const userDoc = await firestore()
      .collection('Users')
      .where('email', '==', userInfo.email)
      .get();
    // const querySnapshot = await firestore().getDocs(userDoc);
    // console.log(querySnapshot);
    // console.log(userDoc);
    // console.log(user)
  };

  fetch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Good day!</Text>
          <Text style={styles.username}>
            {userInfo.fullname || userInfo.email}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.refresh}>
          <Text>Logout</Text>
          {/* <Ionicons name="refresh" size={30} /> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.newsText}>News</Text>
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

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const NewsDetails = ({route}) => {
  const newDataSent = route.params;

  return (
    <View>
      {/* <Text>NewsDetails</Text> */}
      <View>
        <Image source={{uri: newDataSent.media}} style={styles.image} />
        <ScrollView style={styles.newsContent}>
          <Text style={styles.title}>{newDataSent.title}</Text>
          <Text style={styles.summary}>{newDataSent.summary}</Text>
          <Text style={styles.author}>Author: {newDataSent.author}</Text>
          <Text style={styles.source}>Source: {newDataSent.rights}</Text>
          <Text style={styles.twitter}>
            Twitter: {newDataSent.twitter_account ?? 'Unknown'}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(newDataSent.link)}>
            <Text style={styles.readmore}>Read More</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '45%',
  },
  newsContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summary: {
    marginVertical: 10,
  },
  readmore: {
    color: COLORS.blue,
    marginTop: 5,
  },
});

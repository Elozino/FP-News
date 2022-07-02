import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const NewsListing = ({newsData, navigation}) => {
  let topic = newsData.topic;
  topic.charAt(0).toUpperCase();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('NewsDetails', newsData)}>
      <View>
        <Image source={{uri: newsData.media}} style={styles.image} />
      </View>
      <View style={styles.newDetails}>
        <Text style={styles.newText}>{newsData.title}</Text>
        <Text>
          {newsData.topic.charAt(0).toUpperCase() + newsData.topic.slice(1, 4)}
        </Text>
        <Text>{newsData.published_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsListing;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    backgroundColor: COLORS.white,
  },
  image: {
    resizeMode: 'cover',
    height: 130,
    width: 130,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  newDetails: {
    marginLeft: 10,
    flex: 1,
  },
  newText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
});

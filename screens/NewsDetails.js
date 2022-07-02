import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const NewsDetails = ({newsData}) => {
  console.log(newsData);
  return (
    <View>
      <Text>NewsDetails</Text>
      <View>
        {/* <Image source={{uri: newsData.media}} style={styles.image} /> */}
        <Text>Author</Text>
        <Text>Source</Text>
        <Text>Twitter Account</Text>
        <Text>Read More</Text>
      </View>
    </View>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({});

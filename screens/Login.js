/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>SIGN IN</Text>
      <View style={styles.formContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.inputField}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.inputField}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.google}>
        <Text style={styles.googleText}>Login with </Text>
        <AntDesign name="google" color={COLORS.blue} size={20} />
      </TouchableOpacity>
      <View style={styles.auth}>
        <Text>Forgot password? </Text>
        <TouchableOpacity
        // onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Click here</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    color: COLORS.blue,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#32439F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  google: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#cecece',
    borderRadius: 5,
    padding: 9,
    elevation: 5,
  },
  googleText: {
    fontSize: 20,
    fontWeight: '500',
  },
  auth: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.blue,
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

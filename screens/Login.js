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
import React, {useState} from 'react';
import {COLORS} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase/firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {userFieldSelector} from '../config/redux-toolkit/features/userSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userFieldSelector);
  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(userCredentials => {
  //       // console.log(userCredentials);
  //       const user = userCredentials.user;
  //       console.log(user.email);
  //       // navigation.navigate('Home')
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password,
      );
      const user = res.user;
      console.log(user);
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        fullname: userInfo.fullname,
        username: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        password: userInfo.password,
        authProvider: 'local',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../src/assets/logo.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>SIGN IN</Text>
      <View style={styles.formContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Email"
            onChangeText={text => dispatch(email(text))}
            keyboardType="email-address"
            style={styles.inputField}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Password"
            onChangeText={text => dispatch(password(text))}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

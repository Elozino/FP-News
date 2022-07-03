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
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect } from 'react';
import {COLORS} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth, db} from '../config/firebase/firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  email,
  password,
  userFieldSelector,
} from '../config/redux-toolkit/features/userSlice';
import {addDoc, collection} from 'firebase/firestore';

const RegisterAuth = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userFieldSelector);

  // const handleRegister = async () => {
  //   await createUserWithEmailAndPassword(
  //     auth,
  //     userInfo.email,
  //     userInfo.password,
  //   )
  //     .then(userCredentials => {
  //       const user = userCredentials.user;
  //       addDoc(collection(db, 'users'), {
  //         uid: user.uid,
  //         fullname: userInfo.fullname,
  //         username: userInfo.username,
  //         phoneNumber: userInfo.phoneNumber,
  //         email: userInfo.email,
  //         password: userInfo.password,
  //         authProvider: 'local',
  //       });
  //       // navigation.navigate('Home');
  //       console.log(user.email);
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
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

  const handleGoogleAuth = () => {
    // signInWithPopup(auth, googleProvider).then(result =>
    //   navigation.navigate('Home'),
    // );
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, []);

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../src/assets/logo.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>SIGN UP</Text>
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
      <TouchableOpacity style={styles.google} onPress={handleGoogleAuth}>
        <Text style={styles.googleText}>Sign up with </Text>
        <AntDesign name="google" color={COLORS.blue} size={20} />
      </TouchableOpacity>
      <View style={styles.auth}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterAuth;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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

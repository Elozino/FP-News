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
import React, {useEffect} from 'react';
import {COLORS} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebaseAuth, db} from '../config/firebase/firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  email,
  password,
  userFieldSelector,
} from '../config/redux-toolkit/features/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterAuth = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userFieldSelector);
  GoogleSignin.configure({
    webClientId:
      '751970636669-ii6rdlgjsugb99nsjul3pcdi3fgrj22d.apps.googleusercontent.com',
  });

  const handleRegister = async () => {
    auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            fullname: userInfo.fullname,
            username: userInfo.username,
            phoneNumber: userInfo.phoneNumber,
            email: userInfo.email,
            password: userInfo.password,
          })
          .then(() => {
            console.log('User added!');
          });
        console.log('User account created & signed in!');
        alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handleGoogleAuth = async () => {
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(user => {
        dispatch(fullname(user.name));
        navigation.navigate('Home');
        console.log(user);
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
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

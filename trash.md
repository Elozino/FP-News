```
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
```

```
  // const handleLogin = () => {
  //   signInWithEmailAndPassword(firebaseAuth, email, password)
  //     .then(userCredentials => {
  //       // console.log(userCredentials);
  //       const user = userCredentials.user;
  //       console.log(user.email);
  //       // navigation.navigate('Home')
  //     })
  //     .catch(err => console.log(err));
  // };
```

```
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        userInfo.email,
        userInfo.password,
      );
      const user = res.user;
      console.log(user);
      // await addDoc(collection(db, 'users'), {
      //   uid: user.uid,
      //   fullname: userInfo.fullname,
      //   username: userInfo.username,
      //   phoneNumber: userInfo.phoneNumber,
      //   email: userInfo.email,
      //   password: userInfo.password,
      //   authProvider: 'local',
      // });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
```

````
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
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
    ```
````

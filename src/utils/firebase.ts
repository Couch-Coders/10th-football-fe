// Import the functions you need from the SDKs you need
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect, useState } from 'react';
// import getAnalytics from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8XhZXYq4ZOy5I_5EXn7-l-nzyCagS9Lc',
  authDomain: 'football-3b39f.firebaseapp.com',
  projectId: 'football-3b39f',
  storageBucket: 'football-3b39f.appspot.com',
  messagingSenderId: '796123794315',
  appId: '1:796123794315:web:2fdde8b20070a730df3d8e',
  measurementId: 'G-3CNYD22ZFL',
};

const useFirebaseAuth = () => {
  const [auth, setAuth] = useState<firebase.auth.Auth | null>(null);

  useEffect(() => {
    // react-hot-loader error
    // Firebase App Already exist
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      const tempAuth = firebase.auth();

      setAuth(tempAuth);
    }
  }, []);

  useEffect(() => {
    if (auth != null) {
      auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          console.log('token: ', token);
          // axios.get('/temp', {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
          //   // 이미 등록된 사용자일 경우 로그인
          //   // redux에 등록
          //   // localstorage에 spring에서 받은 토큰값 등록
          // }).catch(err => {
          //   console.log(err)
          //   // 사용자가 회원가입일 경우 403 으로 받아 회원가입 권유(임시)
          // })
        }
      });
    }
  }, [auth]);

  const signInGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth?.signInWithPopup(provider);
  };

  const signOut = async () => {
    return await auth?.signOut();
  };

  return {
    auth,
    signInGoogle,
    signOut,
  };
};

export default useFirebaseAuth;

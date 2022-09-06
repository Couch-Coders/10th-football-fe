// Import the functions you need from the SDKs you need
// import getAnalytics from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '@app/store';
import { getUserInfoByToken } from '@redux/userSlice';

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

const app = initializeApp(firebaseConfig);
// Google 제공업체 객체의 인스턴스를 생성합니다.
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(res);
  const token = credential?.accessToken;
  return token;
};

export const signOutGoogle = () => {
  signOut(auth)
    .then((res) => {
      console.log('signout success');
    })
    .catch((err) => {
      console.log('err signout: ', err);
    });
};

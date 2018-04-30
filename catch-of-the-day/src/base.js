import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'catch-of-the-day-greg-bullmer.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-greg-bullmer.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;

const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: 'AIzaSyBYScSoCqKkXkEkXipVhYTc8FqupTXQTG0',
  authDomain: 'kot-app-ahs.firebaseapp.com',
  databaseURL: 'https://kot-app-ahs.firebaseio.com',
  projectId: 'kot-app-ahs',
  storageBucket: 'kot-app-ahs.appspot.com',
  messagingSenderId: '10927273326',
};
// firebase.initializeApp(config);

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};

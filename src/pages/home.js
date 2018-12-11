// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const homeTemplate = require('../templates/home.handlebars');

const firebase = getInstance();

export default () => {
  // Data to be passed to the template

  // Return the compiled template to the router
  update(compile(homeTemplate)());

  // firebase.auth().onAuthStateChanged(() => {
  //   if (user) {
  //     console.log('Currently logged in user: ', user);
  //   } else {
  //     console.log('User home error');
  //     console.log(user);
  //   }
  // });

  const username = document.querySelector('.username');

  const user = firebase.auth().currentUser;
  // const name = firebase.database().ref('users/', getUsername).get({
  //   username: getUsername,
  //   email: getEmail,
  // });

  if (user) {
    console.log('Currently user signed in: ', user);
    console.log(user.email);
    username.innerHTML = `Hallo, ${user.email}!`;
  } else {
    console.log('No user signed in.', user);
  }
};

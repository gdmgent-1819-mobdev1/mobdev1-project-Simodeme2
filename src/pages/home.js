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

  const data = '';
  const noLogin = document.querySelector('.no_login');
  const username = document.querySelector('.username');
  const user = firebase.auth().currentUser;

  if (user) {
    console.log('Currently user signed in: ', user);
    console.log(user.email);
    firebase.database().ref('users/' + user.uid).on('value', (snap) => {
      const userData = snap.val();
      if (data) {
        console.log(data);
        username.innerHTML
        += `
        <h1 class="username__firstname">Hallo, ${userData.first_name} !</h1>
        `;
      } else {
        console.log('No data');
      }
    });
  } else {
    console.log('No user signed in.', user);
    noLogin.innerHTML
    += `
    <div class="no_login_btn border">
      <p><a href="#/signin" data-navigo>Log hier in!</a></p>
    </div>
    <div class="no_login_btn">
      <p><a href="#/signup" data-navigo>Meld je nu aan!</a></p>
    </div>
    <p><i>U bent niet ingelogd.</i></p>
    `;
  }
};

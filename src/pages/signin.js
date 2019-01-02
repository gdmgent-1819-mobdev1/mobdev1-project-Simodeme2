// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const signinTemplate = require('../templates/signin.handlebars');

const firebase = getInstance();

export default () => {
  const title = 'Login';
  update(compile(signinTemplate)({ title }));

  // check for user
  const user = '';
  if(user){
    // nothing
  } else {
    const nav = document.querySelectorAll('.user');
    for (let i = 0; i < nav.length; i++){
      nav[i].style.display = 'none';
    }
  }

  const signinBtn = document.getElementById('signin__btn');

  function signin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Succes');
        window.location.replace('#/');
      })
      .catch(() => {
        console.log('error');
      });
  }

  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signin();
  });
};

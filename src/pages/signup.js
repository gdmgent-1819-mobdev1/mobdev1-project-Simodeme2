// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const signupTemplate = require('../templates/signup.handlebars');

const firebase = getInstance();


export default () => {
  // Data to be passed to the template
  // initFirebase(config);
  const title = 'Registreren';


  // Return the compiled template to the router
  update(compile(signupTemplate)({ title }));

  const user = firebase.auth().currentUser;

  if(user){
    // nothing
  } else {
    const nav = document.querySelectorAll('.user');
    for (let i = 0; i < nav.length; i++){
      nav[i].style.display = 'none';
    }
  }
};

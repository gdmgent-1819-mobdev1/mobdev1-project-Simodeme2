// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const signupTemplate = require('../templates/signup_student.handlebars');

export default () => {
  // Data to be passed to the template
  // initFirebase(config);
  const title = 'Registreren';
  const firebase = getInstance();

  // Return the compiled template to the router
  update(compile(signupTemplate)({ title }));

  // Buttons
  const signupBtn = document.getElementById('signupBtn');

  function signup() {
    const getEmail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const getFirst_name = document.getElementById('first_name').value;
    const getLast_name = document.getElementById('last_name').value;
    const getPhone = document.getElementById('phone').value;
    const getStreet = document.getElementById('street').value;
    const getStreet_number = document.getElementById('street_number').value;
    const getPostcode = document.getElementById('postcode').value;
    const getCity = document.getElementById('city').value;


    firebase.database().ref('users/', getFirst_name).set({
      first_name: getFirst_name,
      last_name: getLast_name,
      email: getEmail,
      phone: getPhone,
      street: getStreet,
      street_number: getStreet_number,
      postcode: getPostcode,
      city: getCity,

    });
    firebase.auth().createUserWithEmailAndPassword(getEmail, password)
      .then(() => {
        console.log('Succes');
        console.log(getFirst_name);
        window.location.replace('#/');
      })
      .catch(() => {
        console.log('error');
      });
  }

  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signup();
  });
};

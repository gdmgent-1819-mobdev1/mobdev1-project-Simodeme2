// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const signupTemplate = require('../templates/signup_kotbaas.handlebars');

export default () => {
  // Data to be passed to the template
  // initFirebase(config);
  const title = 'Registreren';
  const firebase = getInstance();

  // Return the compiled template to the router
  update(compile(signupTemplate)({ title }));

  const user = '';

  if(user){
    // nothing
  } else {
    const nav = document.querySelectorAll('.user');
    for (let i = 0; i < nav.length; i++){
      nav[i].style.display = 'none';
    }
  }

  // Buttons
  const signupBtn = document.getElementById('signupBtn');

  function signup() {
    const getEmail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const getFirstName = document.getElementById('first_name').value;
    const getLastName = document.getElementById('last_name').value;
    const getPhone = document.getElementById('phone').value;
    const getStreet = document.getElementById('street').value;
    const getStreetNumber = document.getElementById('street_number').value;
    const getPostcode = document.getElementById('postcode').value;
    const getCity = document.getElementById('city').value;
    const getStatus = document.getElementById('status').value;


    firebase.auth().createUserWithEmailAndPassword(getEmail, password)
      .then((auth) => {
        console.log('Succes');
        console.log(getFirstName);
        const user = {
          first_name: getFirstName,
          last_name: getLastName,
          email: getEmail,
          phone: getPhone,
          street: getStreet,
          street_number: getStreetNumber,
          postcode: getPostcode,
          city: getCity,
          status: getStatus,
        };
        firebase.database().ref('users/' + auth.user.uid).set(user);
        window.location.replace('#/');
        console.log(auth);
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

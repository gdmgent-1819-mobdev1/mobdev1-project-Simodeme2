// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';
import { userInfo } from 'os';

// Import the template to use
const editTemplate = require('../templates/edit_profile.handlebars');

const firebase = getInstance();

export default () => {
  const title = 'Login';
  update(compile(editTemplate)({ title }));

  // Buttons
  const updateBtn = document.getElementById('update__btn');

  // GET Html elements
  const phone = document.getElementById('phone');
  const street = document.getElementById('street');
  const streetNumber = document.getElementById('street_number');
  const postcode = document.getElementById('postcode');
  const city = document.getElementById('city');
  const school = document.getElementById('school');
  const schoolDiv = document.getElementById('school__div');



  const userData = firebase.auth().currentUser;
  console.log(userData);

  firebase.database().ref('users/' + userData.uid).on('value', (snap) => {
      const user = snap.val();
      console.log(user);

      // check status
      if (user.status == 'student') {
        // nothing
      } else {
        schoolDiv.style.display = 'none';
      }

      // Give inputs placeholders
      phone.value = user.phone;
      street.value = user.street;
      streetNumber.value = user.street_number;
      postcode.value = user.postcode;
      city.value = user.city;
      school.value = user.school;
      
    function update() {
      const user = {
          phone: phone.value,
          street: street.value,
          street_number: streetNumber.value,
          postcode: postcode.value,
          city: city.value,
          school: school.value,
        };
        firebase.database().ref('users/' + userData.uid).update(user);
        window.location.replace('#/profile');
    }

    updateBtn.addEventListener('click', () => {
        update();
        window.location.replace('#/profile');
    })
  })
};

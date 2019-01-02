// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const profileTemplate = require('../templates/profile.handlebars');

export default () => {

  const title = 'Profiel';
  const firebase = getInstance();
 
  update(compile(profileTemplate)({ title }));

  // HTML elements
  const profile = document.querySelector('.profile');
  const editProfile = document.querySelector('.edit__btn');

  // get user
  const userData = firebase.auth().currentUser;

  firebase.database().ref('users/' + userData.uid).on('value', (snap) => {
    console.log('Profile of: ', userData);
    const user = snap.val();
    console.log(user)
    profile.innerHTML
    += `
    <div class="profile__user">
      <div class="profile__greet">
          <h2>Hallo, ${user.first_name + ' ' + user.last_name}!</h2>
      </div>
      <div class="profile__values">
        <div class="profile__item">
          <div class="profile__value">
            <h3>Email:</h3>
          </div>
          <div class="profile__user">
            <p>${user.email}</p>
          </div>
        </div>
        <div class="profile__item">
          <div class="profile__value">
            <h3>Telefoonnummer:</h3>
          </div>
          <div class="profile__user">
            <p>${user.phone}</p>
          </div>
        </div>
        <div class="profile__item">
          <div class="profile__value">
            <h3>Adres:</h3>
          </div>
          <div class="profile__user adress">
            <p>${user.street + ' ' + user.street_number + ', ' + user.postcode + ' ' + user.city} </p>
          </div>
        </div>
        <div class="profile__item">
          <div class="profile__value">
            <h3>Status:</h3>
          </div>
          <div class="profile__user">
            <p>${user.status}</p>
          </div>
        </div>
        <div id="check__status" class="profile__item">
          <div class="profile__value">
            <h3>Studeert aan:</h3>
          </div>
          <div class="profile__user">
            <p>${user.school}</p>
          </div>
        </div>
      </div>
    </div>
    `;
    const status = document.getElementById('check__status');
    if (status) {
      if (user.status == 'student') {
        // Nothing
      } else {
        status.style.display = 'none';
      }
    }
    
  });

  editProfile.addEventListener('click', () => {
    window.location.replace('#/profile/edit');
  })
};

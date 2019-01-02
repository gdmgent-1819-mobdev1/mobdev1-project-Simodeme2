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

  // get HTML elements
  const noLogin = document.querySelector('.no__login');
  const noLoginText = document.querySelector('.no_login_text');
  const username = document.querySelector('.username');
  const cards = document.querySelector('.cards');

  // get user
  const user = firebase.auth().currentUser;

  firebase.database().ref('koten').on('value', (snap) => {
    snap.forEach((data) => {
      const card = data.val();

      cards.innerHTML
      += `
      <div class="card">
        <div class="card__img">
          <img src="../../src/assets/img/${card.img}" alt="img">
        </div>
        <div class="card__content">
          <div class="card__headers">
            <h2 class="card__title">${card.name}</h2>
            <h3 class="card__price">€ ${card.price}</h3>
          </div>
          <p class="card__description">${card.description}</p>
          <p class="card__location"><b>Locatie:</b> ${card.location}</p>
        </div>
      </div>
      <div id="card__btn" class="card__btn">
        <a href="#/kot/${data.key}">
          <button id="cardBtn" class="cardBtn">Bekijk dit kot!</button>
        </a>
      </div>
      `;
      
      
    })

    // Call Geocode
    geocode();
    // GET Geocoding distance
    function geocode() {
      const location = '22 Main st Boston MA';
      fetch(`https://maps.googleapis.com/maps/api/geocode/json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        params:{
          address: location,
          key: 'AIzaSyAqLWqxV03GOuLs5xZ-eHsHvyx_yhca6qA',
        }
      })
      .catch(function (err) {
        console.log(err);
      })
    }

    // get HTML elements
    const cardBtns = document.querySelectorAll("div.card__btn");
    
    // check user
    if (user) {
      console.log('Currently user signed in: ', user);
      console.log(user.email);
      firebase.database().ref('users/' + user.uid).on('value', (snap) => {
        const userData = snap.val();
        if (userData) {
          console.log(userData);
          username.innerHTML
          += `
          <h1 class="username__firstname">Hallo, ${userData.first_name} !</h1>
          `;
        } else {
          console.log('No data');
        }
      });


      // tmpSignout
      const signout = document.querySelector('.signout');

      signout.innerHTML
      += `
      <button id="trigger__signout" class="button">Afmelden</button>
      `;

      const triggerSignout = document.getElementById('trigger__signout');
      console.log(triggerSignout);

      triggerSignout.addEventListener('click', () => {
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
          location.reload();
        }, function(error) {
            console.error('Sign Out Error', error);
        });
      });
      
    } else {
      const nav = document.querySelectorAll('.user');
      console.log(nav);
      for (let i = 0; i < nav.length; i++){
        nav[i].style.display = 'none';
      }
      console.log('No user signed in.', user);

      noLogin.innerHTML
      += `
      <div class="no_login_btn home__btn">
        <p><a href="#/signin" data-navigo>Log hier in!</a></p>
      </div>
      <div class="no_login_btn home__btn">
        <p><a href="#/signup" data-navigo>Meld je nu aan!</a></p>
      </div>
      `;
  
      noLoginText.innerHTML
      += `
      <p><i>U bent niet ingelogd.</i></p>
      `;
      
      console.log(cardBtns);
      for (let i = 0; i < cardBtns.length; i++) {
        cardBtns[i].style.display = 'none';
      }
    }
  })
  
  // window.addEventListener('load', () => {
  //   loadCards();
  //   checkUser();
  // })
};

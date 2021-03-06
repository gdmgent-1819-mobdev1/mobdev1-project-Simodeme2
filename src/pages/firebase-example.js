// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';

// Import the update helper
import update from '../helpers/update';

const { getInstance } = require('../firebase/firebase');

const firebase = getInstance();
// Import the template to use
const aboutTemplate = require('../templates/list.handlebars');

export default () => {
  // Data to be passed to the template
  let loading = true;
  let posts = {};
  const title = 'Firebase calls example';

  // const signupBtn = document.getElementById('signupBtn');
  // function signup() {
  //   const email = document.getElementById('email.value').value;
  //   console.log(email);
  // }

  // if (signupBtn) {
  //   signupBtn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     signup();
  //   });
  // }
  // Return the compiled template to the router
  update(compile(aboutTemplate)({ title, loading, posts }));

  if (firebase) {
    const database = firebase.database().ref('/posts');
    database.on('value', (snapshot) => {
      posts = snapshot.val();
      loading = false;
      // Run the update helper to update the template
      update(compile(aboutTemplate)({ title, loading, posts }));
    });
  }
};

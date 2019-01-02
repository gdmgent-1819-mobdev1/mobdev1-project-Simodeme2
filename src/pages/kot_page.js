// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import { getInstance } from '../firebase/firebase';
import update from '../helpers/update';

// Import the template to use
const kotPageTemplate = require('../templates/kot_page.handlebars');

const firebase = getInstance();

export default () => {
  const title = 'Detail page';
  

  // GET room key
  const roomKey = window.location.href.split('/')[5];
  console.log('id: ', roomKey);
  // HTML elements
  // const kotPlaceholder = document.querySelector('.kot');

  firebase.database().ref('koten/' + roomKey).on('value', (snap) => {
    console.log(snap);
    const data = snap.val();
    update(compile(kotPageTemplate)({ title, data }));
    console.log(data);
  })

  // signkotPlaceholder.innerHTML
  // += `
  
  // `;
};

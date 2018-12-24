// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';

// Import the template to use
const signupTemplate = require('../templates/signup.handlebars');

export default () => {
  // Data to be passed to the template
  // initFirebase(config);
  const title = 'Registreren';


  // Return the compiled template to the router
  update(compile(signupTemplate)({ title }));
};

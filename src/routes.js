// Pages
import HomeView from './pages/home';
import AboutView from './pages/about';
import SignupView from './pages/signup';
import SignupStudentView from './pages/signup_student';
import SignupKotbaasView from './pages/signup_kotbaas';
import SigninView from './pages/signin';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import KotPageView from './pages/kot_page';
import ProfileView from './pages/profile';
import EditProfileView from './pages/edit_profile';

export default [
  { path: '/', view: HomeView },
  { path: '/about', view: AboutView },
  { path: '/signup', view: SignupView },
  { path: '/signup_student', view: SignupStudentView },
  { path: '/signup_kotbaas', view: SignupKotbaasView },
  { path: '/signin', view: SigninView },
  { path: '/firebase', view: FirebaseView },
  { path: '/mapbox', view: MapboxView },
  { path: '/kot/:id', view: KotPageView },
  { path: '/profile', view: ProfileView },
  { path: '/profile/edit', view: EditProfileView },
];

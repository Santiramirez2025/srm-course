import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Reemplaza con tus credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-3IwJh0vgOQ3jzdRjlGQvFt5l89qM0OY",
    authDomain: "srm-curso.firebaseapp.com",
    projectId: "srm-curso",
    storageBucket: "srm-curso.firebasestorage.app",
    messagingSenderId: "489282522491",
    appId: "1:489282522491:web:59bea2a92bbfa6932e41de",
    measurementId: "G-CHFB16D13C"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
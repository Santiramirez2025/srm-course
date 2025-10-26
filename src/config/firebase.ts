import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validar que las variables de entorno estén configuradas
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
        '❌ Firebase no está configurado correctamente.\n' +
        'Por favor copia .env.example a .env y añade tus credenciales de Firebase.\n' +
        'Documentación: https://console.firebase.google.com/'
    );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
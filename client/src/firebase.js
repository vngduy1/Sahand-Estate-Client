// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'estate-405f6.firebaseapp.com',
    projectId: 'estate-405f6',
    storageBucket: 'estate-405f6.appspot.com',
    messagingSenderId: '782732039754',
    appId: '1:782732039754:web:25d3b1c4a6b2bd8654f8b3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

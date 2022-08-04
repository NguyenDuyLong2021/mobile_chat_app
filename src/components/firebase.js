// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHbwfv35B1QAYWOo3HUv9_EC2bK70fkKY",
  authDomain: "chat-app-77ea6.firebaseapp.com",
  databaseURL: "https://chat-app-77ea6-default-rtdb.firebaseio.com",
  projectId: "chat-app-77ea6",
  storageBucket: "chat-app-77ea6.appspot.com",
  messagingSenderId: "401972816312",
  appId: "1:401972816312:web:9c5809b8e4ff5629cb874d",
  measurementId: "G-56Q57BP2DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export {app, analytics, auth};

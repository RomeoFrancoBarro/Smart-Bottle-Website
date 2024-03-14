import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

function StartFirebase() {
  

  const firebaseConfig = {
    apiKey: "AIzaSyASAKT0Vaay7Ei4JRs0LEGVHttFWFpTE7I",
    authDomain: "bottleserver-41515.firebaseapp.com",
    databaseURL: "https://bottleserver-41515-default-rtdb.firebaseio.com",
    projectId: "bottleserver-41515",
    storageBucket: "bottleserver-41515.appspot.com",
    messagingSenderId: "196230764515",
    appId: "1:196230764515:web:2dd771d014a04d6a3432d6",
    measurementId: "G-YX3BV13MQH"
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);

}

const firebaseConfig = {
  apiKey: "AIzaSyASAKT0Vaay7Ei4JRs0LEGVHttFWFpTE7I",
  authDomain: "bottleserver-41515.firebaseapp.com",
  databaseURL: "https://bottleserver-41515-default-rtdb.firebaseio.com",
  projectId: "bottleserver-41515",
  storageBucket: "bottleserver-41515.appspot.com",
  messagingSenderId: "196230764515",
  appId: "1:196230764515:web:2dd771d014a04d6a3432d6",
  measurementId: "G-YX3BV13MQH"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default StartFirebase;







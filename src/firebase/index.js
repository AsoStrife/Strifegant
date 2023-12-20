import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo49y3jtl7392QR-9CQsGehC1ur9pWXSM",
  authDomain: "strifegantt.firebaseapp.com",
  projectId: "strifegantt",
  storageBucket: "strifegantt.appspot.com",
  messagingSenderId: "404053463666",
  appId: "1:404053463666:web:b23fc8986ef59b0ca528eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    db
}
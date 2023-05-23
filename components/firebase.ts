import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDTbScAd9qLjxVal1h3R0UFHdnW_3cT7Ys",
  authDomain: "candyd-tech.firebaseapp.com",
  databaseURL: "https://candyd-tech-default-rtdb.firebaseio.com",
  projectId: "candyd-tech",
  storageBucket: "candyd-tech.appspot.com",
  messagingSenderId: "1089985563059",
  appId: "1:1089985563059:web:0f1832aaf8b10f150163c6",
  measurementId: "G-3GP5YV2FZW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    // const user = res.user;
    // console.log(user);

  } catch (err) {
    console.error(err);
  }
}

const logOut = () => {
  signOut(auth)
}


export { db, auth, signInWithGoogle, logOut};

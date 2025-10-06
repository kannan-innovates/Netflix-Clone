import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
      getAuth, 
      signInWithEmailAndPassword,
      signOut
     } from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCzrfgOKbWqbk4RgLztsKiOQBDc2SL98mY",
  authDomain: "netflix-clone-ec0a8.firebaseapp.com",
  projectId: "netflix-clone-ec0a8",
  storageBucket: "netflix-clone-ec0a8.firebasestorage.app",
  messagingSenderId: "414207503637",
  appId: "1:414207503637:web:f39c03c9f87c919f010d1c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
     try {
         const res = await createUserWithEmailAndPassword(auth, email, password);
         const user = res.user;

         await addDoc(collection(db, "user"), {
          uid: user.uid,
          name,
          authProvider: 'local',
          email,
         });
     } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(' '))
     }
}

const login = async(email, password) => {
     try {
          await signInWithEmailAndPassword(auth, email, password)
     } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(' '))
     }
}

const logout = async () => {
     try {
          await signOut(auth)
     } catch (error) {
          console.log(error);
          alert(error)
     }
}

export {auth, db, login, signup, logout}
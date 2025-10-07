import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
      getAuth, 
      signInWithEmailAndPassword,
      signOut
     } from 'firebase/auth'
import { addDoc, collection, getFirestore, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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

// Watchlist Functions
const addToWatchlistDB = async (userId, movie) => {
     try {
          await addDoc(collection(db, "watchlist"), {
               uid: userId,
               movieId: movie.id,
               title: movie.title,
               backdrop_path: movie.backdrop_path,
               overview: movie.overview,
               vote_average: movie.vote_average,
               addedAt: new Date()
          });
     } catch (error) {
          console.log(error);
          toast.error("Failed to add to watchlist");
     }
}

const getWatchlistDB = async (userId) => {
     try {
          const q = query(collection(db, "watchlist"), where("uid", "==", userId));
          const querySnapshot = await getDocs(q);
          const watchlist = [];
          querySnapshot.forEach((doc) => {
               watchlist.push({ docId: doc.id, ...doc.data() });
          });
          return watchlist;
     } catch (error) {
          console.log(error);
          return [];
     }
}

const removeFromWatchlistDB = async (docId) => {
     try {
          await deleteDoc(doc(db, "watchlist", docId));
     } catch (error) {
          console.log(error);
          toast.error("Failed to remove from watchlist");
     }
}

export {auth, db, login, signup, logout, addToWatchlistDB, getWatchlistDB, removeFromWatchlistDB}
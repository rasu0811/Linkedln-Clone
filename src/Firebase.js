import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAyAn14NQbXPhHTH4EZTZuTVPiEH6icxps",
  authDomain: "linkedin-clone-7c705.firebaseapp.com",
  projectId: "linkedin-clone-7c705",
  storageBucket: "linkedin-clone-7c705.appspot.com",
  messagingSenderId: "432328749037",
  appId: "1:432328749037:web:7d82d4ce4a4be07c3701e4"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);


  export {auth, provider,storage};
  export default db;

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBHD8pWt_6my8SxWHdE6XSvbJ3Vp_ixddA',
  authDomain: 'whatsapp-clone-2-99e09.firebaseapp.com',
  projectId: 'whatsapp-clone-2-99e09',
  storageBucket: 'whatsapp-clone-2-99e09.appspot.com',
  messagingSenderId: '109534276250',
  appId: '1:109534276250:web:33e3923fc9d14112510d23'
}

const app = !firebase.apps.length
  ? initializeApp(firebaseConfig)
  : firebase.app()

  // const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// const storage = getStorage(app);

// const db = app.firestore()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }

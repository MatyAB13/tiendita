// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// ✅ Pega aquí TUS datos de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEYkftWkcmDHYhv_NCziF9STNMIGHLJfQ",
  authDomain: "tiendita-aa5e4.firebaseapp.com",
  projectId: "tiendita-aa5e4",
  storageBucket: "tiendita-aa5e4.firebasestorage.app",
  messagingSenderId: "1058662943918",
  appId: "1:1058662943918:web:af1d7ebcd9c945521db13f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };


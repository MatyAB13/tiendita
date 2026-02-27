// ============================================================
// firebase-config.js — Configuracion central de Firebase v10
// ============================================================
// INSTRUCCIONES: Reemplaza los valores de firebaseConfig con
// los de tu proyecto en la consola de Firebase.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// -----------------------------------------------------------
// Configuracion de tu proyecto Firebase (reemplaza aqui)
// -----------------------------------------------------------
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// -----------------------------------------------------------
// Inicializacion de Firebase
// -----------------------------------------------------------
const app = initializeApp(firebaseConfig);

/** Instancia de Firestore */
export const db = getFirestore(app);

/** Instancia de Authentication */
export const auth = getAuth(app);

/** Instancia de Storage */
export const storage = getStorage(app);

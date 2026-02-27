// ============================================================
// firebase-config.js — Configuración central de Firebase v10
// Reemplaza los valores con los de tu proyecto en Firebase Console
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage }     from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ─── Tu configuración de Firebase ───────────────────────────
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROJECT.firebaseapp.com",
  projectId:         "TU_PROJECT_ID",
  storageBucket:     "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId:             "TU_APP_ID"
};

// ─── Inicialización ─────────────────────────────────────────
const app     = initializeApp(firebaseConfig);
const db      = getFirestore(app);
const auth    = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

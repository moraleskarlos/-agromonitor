import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Nota: este objeto no es secreto, la seguridad real la dan las Reglas de Firestore.
const firebaseConfig = {
  apiKey: "AIzaSyA-MMd6KpsXegvsvyxm45nU-uHqi3Cr_po",
  authDomain: "agromonitor-prod.firebaseapp.com",
  projectId: "agromonitor-prod",
  storageBucket: "agromonitor-prod.firebasestorage.app",
  messagingSenderId: "1087646721837",
  appId: "1:1087646721837:web:de60783451b076f89f15a4",
  measurementId: "G-VMLEM70QTV",
};

// El usuario escribe "juan.perez", el código arma juan.perez@agromonitor.local
export const DOMINIO_LOGIN = "agromonitor.local";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

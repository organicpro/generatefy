
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjj3YHujvCXL5tAx2H4WVnbCP0-mmOym4",
  authDomain: "ryzebuilder.firebaseapp.com",
  projectId: "ryzebuilder",
  storageBucket: "ryzebuilder.firebasestorage.app",
  messagingSenderId: "90298199624",
  appId: "1:90298199624:web:7d65e3557c28e0b7e4327d",
  measurementId: "G-5W5CVXW13X"
};

// Função para verificar se o Firebase foi configurado pelo usuário
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "SUA_API_KEY" && firebaseConfig.projectId !== "SEU_PROJETO";
};

// Inicializa o Firebase apenas se as chaves forem válidas
const app = isFirebaseConfigured() ? initializeApp(firebaseConfig) : null;

// Exporta as instâncias (ou null se não configurado)
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export default app;

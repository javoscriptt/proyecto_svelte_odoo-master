import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvCtgBLXEYkz-EbbDivgOYqB1NIDh1IYQ",
    authDomain: "proyectoitermodular.firebaseapp.com",
    projectId: "proyectoitermodular",
    storageBucket: "proyectoitermodular.firebasestorage.app",
    messagingSenderId: "316353781165",
    appId: "1:316353781165:web:668d59dd14cf6106d8d524",
    measurementId: "G-T3C47QFGL5"
};

// Inicializa Firebase (sin analytics para evitar el error de "window is not defined")
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBE_Tga-6en6AyR_ByARaNOHHZG_-xbS5o",
    authDomain: "credoraa.firebaseapp.com",
    projectId: "credoraa",
    storageBucket: "credoraa.firebasestorage.app",
    messagingSenderId: "561625412054",
    appId: "1:561625412054:web:6947ce03777c2bc499b477",
    measurementId: "G-7RX7T1WVG1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

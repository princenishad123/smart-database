import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)
const myFile = getStorage(app)
export {db,myFile};
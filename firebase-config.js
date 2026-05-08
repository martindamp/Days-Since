// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyDzefQpOR6Z-894YxY805P73PK6AfqqGsw",
	authDomain: "shiny-tracker-f6702.firebaseapp.com",
	projectId: "shiny-tracker-f6702",
	storageBucket: "shiny-tracker-f6702.firebasestorage.app",
	messagingSenderId: "227154149489",
	appId: "1:227154149489:web:735c5da8ab76a8033adbd0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import {
	getAuth,
	// signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBv4NfO5UQCeDH7mdjQOK1CwaqDCRhErvw",
	authDomain: "crwn-clothing-c3efe.firebaseapp.com",
	projectId: "crwn-clothing-c3efe",
	storageBucket: "crwn-clothing-c3efe.appspot.com",
	messagingSenderId: "334568490420",
	appId: "1:334568490420:web:664d16fc5e8be0ea1e5ee1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	propmt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
// 	signInWithRedirect(auth, googleProvider);

// create a firestore instance
export const db = getFirestore();
// take userAuth information from sign-in.component and save it in the db instance.
// the path shows users/userAuth.uid
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = { displayName: "defaultName" }
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	// snapshot - check whetehr or not there is an instance of it in database (by .exists())
	const userSnapshot = await getDoc(userDocRef);

	// if user data doesn't exist
	// create/set the document with the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	// if user data exists/or just after creating data from above
	// return userDocRef
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

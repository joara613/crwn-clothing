import { initializeApp } from "firebase/app";
import {
	getAuth,
	// signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	// batch- when batch was fired off, initiate batch method
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};
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

export const signInAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA2MQkTxR6bjo6uG-so8qTCkTXbalS-NLw",
  authDomain: "crown-db-9590a.firebaseapp.com",
  databaseURL: "https://crown-db-9590a.firebaseio.com",
  projectId: "crown-db-9590a",
  storageBucket: "crown-db-9590a.appspot.com",
  messagingSenderId: "35982196138",
  appId: "1:35982196138:web:32897753a1e5199a053fd3",
  measurementId: "G-VHM93LTY4Z",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmpt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (userAuth) {
    // Check if the user already exists in the database
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();

    // If the user does not exist, create a new user in the db.
    if (!userSnapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log("Error while creating new user\n", error.message);
      }
    }
    // Return userRef if new user is created, else return nothing
    return userRef;
  }
};

export default firebase;

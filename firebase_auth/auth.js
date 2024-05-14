import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (
//   name,
//   email,
//   password
// ) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

export const doCreateUserWithEmailAndPassword = async (
  name,
  email,
  password
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Set display name if provided
  if (name) {
    await updateProfile(userCredential.user, {
      displayName: name,
    });
  }

  return userCredential;
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
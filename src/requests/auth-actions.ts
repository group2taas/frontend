import { auth } from "@/configs/configs"
import {
  browserLocalPersistence,
  EmailAuthProvider,
  sendEmailVerification as firebaseSendEmailVerification, sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  inMemoryPersistence, reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword, signOut,
  verifyBeforeUpdateEmail
} from "firebase/auth";

interface LoginData {
  email: string;
  password: string;
  staySignedIn: boolean; 
}

export const login = async (loginData: LoginData) => {
  const persistence = loginData.staySignedIn ? browserLocalPersistence : inMemoryPersistence;
  try {
    await setPersistence(auth, persistence);
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
  } catch (error: unknown) {
    throw (error);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const sendPasswordResetEmail = async (email: string, redirectUrl: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email, { url: redirectUrl });
  } catch (error: unknown) {
    throw (error);
  }
};

export const updateEmail = async (newEmail: string, password: string, redirectUrl: string) => {
  if (!auth.currentUser || !auth.currentUser.email) {
    throw Error("Unable to update email")
  }

  const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
  try {
    await reauthenticateWithCredential(auth.currentUser, credential);
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail, { url: redirectUrl });
  } catch (error: unknown) {
    throw (error);
  }
};

export const updatePassword = async (newPassword: string, currentPassword: string) => {
  if (!auth.currentUser || !auth.currentUser.email) {
    throw Error("Unable to update password")
  }

  const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
  try {
    await reauthenticateWithCredential(auth.currentUser, credential);
    await firebaseUpdatePassword(auth.currentUser, newPassword);
  } catch (error: unknown) {
    throw (error);
  }
};

export const sendEmailVerification = async () => {
  if (!auth.currentUser) {
    throw Error("Unable to send verification email")
  }
  try {
    await firebaseSendEmailVerification(auth.currentUser);
  } catch (error) {
    throw (error);
  }
};

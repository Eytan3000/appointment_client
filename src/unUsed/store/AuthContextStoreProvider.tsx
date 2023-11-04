import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContextStore';
import { User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextValue {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  // logOut: () => Promise<void>;
  // changePassword: (password: string) => Promise<void>;
  // reAuthenticate: (password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // // Load user data from local storage when the app initializes
  // useEffect(() => {
  //   const userData = localStorage.getItem('user');
  //   if (userData) {
  //     setCurrentUser(JSON.parse(userData));
  //   }
  // }, []);

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // if (user) {
      //   // Save user data to local storage when logged in
      //   localStorage.setItem('user', JSON.stringify(user));
      // } else {
      //   // Remove user data from local storage when logged out
      //   localStorage.removeItem('user');
      // }
    });
    return unsubscribed;
  }, []);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  // function logOut() {
  //   localStorage.removeItem('user');
  //   // return sendPasswordResetEmail(auth, email);
  // }
  function logout(email, password) {
    // localStorage.removeItem('user');
    return signOut(auth, email, password);
  }

  // logout('user4@gmail.com', '111111');

  // localStorage.removeItem('user');
  const value: AuthContextValue = { currentUser, signup, login, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

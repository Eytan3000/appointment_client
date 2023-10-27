import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
//------------------------------------------------
const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribed;
  }, []);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }


  const value = { currentUser, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

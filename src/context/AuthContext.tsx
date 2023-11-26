import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, provider } from '../firebase';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updatePassword,
} from 'firebase/auth';

//------------------------------------------------

interface AuthContextValue {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  // reAuthenticate: (password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  updatePasswordCtx: (password: string) => Promise<void> | undefined;
  logout: () => Promise<void> ;
  googleSignIn: () => Promise<void> ;
  isMoblie: boolean;
}

//------------------------------------------------
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribed;
  }, []);

  // isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial mobile state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  function logout() {
    return signOut(auth);
  }

  function updatePasswordCtx(password: string) {
    if (currentUser) return updatePassword(currentUser, password);
  }

  function googleSignIn(){
    return signInWithRedirect(auth, provider);
    // return signInWithPopup(auth, provider);
  }

  const value: AuthContextValue = {
    currentUser,
    signup,
    login,
    resetPassword,
    updatePasswordCtx,
    logout,
    googleSignIn,
    isMobile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface User {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
          photoURL: firebaseUser.photoURL || undefined
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: 'Email o contraseña incorrectos' };
    }
  };

  // ✨ NUEVO: Login con Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      return { success: true, error: null };
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Inicio de sesión cancelado' };
      }
      return { success: false, error: 'Error al iniciar sesión con Google' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { 
    user, 
    loading,
    login, 
    register, 
    loginWithGoogle, // ✨ NUEVO
    logout, 
    isAuthenticated: !!user 
  };
};
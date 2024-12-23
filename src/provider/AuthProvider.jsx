import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/Firebase.init';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // console.log(user);


    // Register User
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login User
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // User Logout
    const userLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Google Login 
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Update Profile Information
    const updateProfileInfo = (updatedName, updatedPhotoURL) => {
        if (!auth.currentUser) return;
        return updateProfile(auth.currentUser, {
            displayName: updatedName,
            photoURL: updatedPhotoURL,
        }).then(() => {
            // Update context user state
            setUser({ ...auth.currentUser });
        });
    };

    const authInfo = {
        createNewUser,
        userLogin,
        userLogout,
        loginWithGoogle,
        updateProfileInfo,
        user,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
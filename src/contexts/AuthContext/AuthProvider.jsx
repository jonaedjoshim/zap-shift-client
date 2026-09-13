import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    const signInUser = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    const googleSignIn = () => {
        setLoading(true);

        return signInWithPopup(
            auth,
            googleProvider
        );
    };

    const updateUserProfile = (profile) => {
        if (!auth.currentUser) {
            return Promise.reject(
                new Error("No authenticated user found.")
            );
        }

        return updateProfile(
            auth.currentUser,
            profile
        );
    };

    const verifyEmail = () => {
        if (!auth.currentUser) {
            return Promise.reject(
                new Error("No authenticated user found.")
            );
        }

        return sendEmailVerification(
            auth.currentUser
        );
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(
            auth,
            email
        );
    };

    const signout = () => {
        setLoading(true);

        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        updateUserProfile,
        verifyEmail,
        resetPassword,
        signout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
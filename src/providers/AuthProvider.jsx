import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../config/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSingIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const updateNewUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })       

        return () => {
            return unSubscribe();
        }

    }, [])

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         if (currentUser) {                
    //             const userInfo = {
    //                 email: currentUser.email
    //             }
    //             axiosPublic.post(`/api/v1/auth/access-token`, userInfo, { withCredentials: true })
    //                 .then(res => {
    //                     console.log(res.data)
    //                     if (res.data.success) {                                                       
    //                         setLoading(false);                           
    //                     }
    //                 })
    //         }
       

    //     })
    //     return () => {
    //         return unSubscribe();
    //     }
    // }, [axiosPublic])

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(false);
    //     })       

    //     return () => {
    //         return unSubscribe();
    //     }

    // }, [])

    const authInfo = {
        user,
        logOut,
        signIn,
        loading,
        setLoading,
        createUser,
        googleSingIn,
        updateNewUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
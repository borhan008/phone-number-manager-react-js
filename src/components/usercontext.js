import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext();
export function UseAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    async function Registration(email, password, name){
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName : name
        });
        const user = auth.currentUser;
        setCurrentUser({
            ...user
        });
        const user_id = user.uid;
        if(user_id) {
            setDoc(doc(db, 'users', user_id), {
                name : user.displayName
            });
         }
    }
    function LogIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }
    function LogOut(){
        setLoading(true);
        signOut(auth);
        setLoading(false);
    }

    const  value = {
        currentUser,
        loading,
        Registration,
        LogIn,
        LogOut
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
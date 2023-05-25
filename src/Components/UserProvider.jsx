import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase'

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        emailVerified: '',
        phone: '',
    });
    useEffect(() => {
        setTimeout(() => {
            setUser({
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                emailVerified: auth.currentUser.emailVerified,
                phone: auth.currentUser.phoneNumber
            });
        }, 2000);
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider >
    )
}

export default UserProvider;
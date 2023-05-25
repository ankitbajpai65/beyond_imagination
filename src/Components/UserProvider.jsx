import React, { useContext, createContext } from 'react'
import { auth } from './firebase.jsx'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    // const x = auth.currentUser;
    const [name, setName] = useState('Ankit');
    return (
        <UserContext.Provider value={name}>
            {children}
        </UserContext.Provider >
    )
}

export default UserProvider;
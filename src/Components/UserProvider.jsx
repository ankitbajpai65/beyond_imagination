import React, { createContext } from 'react'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [name, setName] = useState('Ankit');
    return (
        <UserContext.Provider value={name}>
            {children}
        </UserContext.Provider >
    )
}

export default UserProvider;
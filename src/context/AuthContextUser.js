
import { createContext, useState } from 'react'

export const AuthContextUser = createContext()

export const AuthContextUserProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState(false)

    return (
        <AuthContextUser.Provider value={{userAuth, setUserAuth}}>
            {children}
        </AuthContextUser.Provider>
    )
}
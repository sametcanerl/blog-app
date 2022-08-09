import { createContext, useEffect,useState } from "react";
import { userObserver } from "../utils/auth";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{

    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        userObserver(setCurrentUser);
      }, []);

return (

   < AuthContext.Provider value={{currentUser}} >
   {children}
   </AuthContext.Provider>
)

}

export default AuthContextProvider
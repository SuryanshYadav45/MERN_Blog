import { createContext,useState } from "react";

export const UserContext =createContext({});

export function UserContextProvider({children})
{
    const [user, setUser] = useState(null);
    
      const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      };
    
      const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
      };

    return(
        <UserContext.Provider value={{user,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
            
        
    )
}
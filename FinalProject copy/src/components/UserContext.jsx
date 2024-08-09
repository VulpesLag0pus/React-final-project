import React, { createContext, useState } from "react";

 const UserContext = createContext();

 function UserProvider({ children }) {
  const [name, setName] = useState("");
  

  return (<UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>);
}
export { UserProvider, UserContext};
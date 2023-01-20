import React, { createContext } from "react";

import useCoinsStore from "./useCoinsStore";
import useAuthStore from "./useAuthStore";

export const globalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const coinsStore = useCoinsStore();
  const authStore = useAuthStore();

  return (
    <globalContext.Provider value={{ coinsStore, authStore }}>
      {children}
    </globalContext.Provider>
  );
};

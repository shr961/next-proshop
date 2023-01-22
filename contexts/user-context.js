import { createContext, useContext, useMemo, useReducer } from "react";

const proshopUserData = JSON.parse(localStorage.getItem("proshop-user"));

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "":
      return { ...state };
    default:
      return state;
  }
};

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: { name: "", email: "", isAdmin: "", accessToken: "" },
  });

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContextProvider!"
    );
  }

  return context;
}

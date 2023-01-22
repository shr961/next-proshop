import UserContextProvider from "./user-context";

export default function ContextProvider({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

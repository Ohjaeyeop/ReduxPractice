import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface UserType {
  email: string;
}

const UserContext = createContext<{
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
} | null>(null);

function UserProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<UserType | null>(null);
  const value = {user, setUser};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export {UserProvider, useUser};

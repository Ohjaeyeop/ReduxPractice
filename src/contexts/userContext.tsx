import React, {createContext, useState} from 'react';

const UserContext = createContext(null);

function UserProvider() {
  const [user, setUser] = useState(null);

  return <UserContext.Provider value={user} />;
}

export {UserProvider};

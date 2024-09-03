'use client';

import { SessionProvider } from 'next-auth/react';

type AuthContextType = {
  children: React.ReactNode;
};

const AuthContext = ({ children }: AuthContextType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;

// app/provider/provider.js or provider.tsx (Client Component)
"use client";

import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default Providers;

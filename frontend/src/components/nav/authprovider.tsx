"use client";

import { Auth0Provider } from "@auth0/auth0-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

  return (
    <Auth0Provider
      domain="usepinion.jp.auth0.com"
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;

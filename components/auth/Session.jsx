import { createContext, useContext } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { isDemoMode } from "../database/RecipesProvider";

const SessionContext = createContext(null);
const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const demoUser = {
  name: "Visitante de demostración",
  email: "Perfil local, sin cuenta",
  picture: "/demo-profile.svg",
};

// Auth0 conserva su sesión en un proveedor global, también al cambiar de ruta.
function Auth0Session({ children }) {
  const auth = useAuth0();
  return (
    <SessionContext.Provider value={{ ...auth, isDemo: false, configured: true }}>
      {children}
    </SessionContext.Provider>
  );
}

export function SessionProvider({ children }) {
  if (isDemoMode) {
    return (
      <SessionContext.Provider
        value={{
          user: demoUser,
          isDemo: true,
          isAuthenticated: true,
          isLoading: false,
          configured: false,
        }}
      >
        {children}
      </SessionContext.Provider>
    );
  }
  if (!domain || !clientId) {
    return (
      <SessionContext.Provider
        value={{
          user: null,
          isDemo: false,
          isAuthenticated: false,
          isLoading: false,
          configured: false,
        }}
      >
        {children}
      </SessionContext.Provider>
    );
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: appUrl.replace(/\/$/, "") + "/home/lobby" }}
    >
      <Auth0Session>{children}</Auth0Session>
    </Auth0Provider>
  );
}
export function useSession() {
  return useContext(SessionContext);
}

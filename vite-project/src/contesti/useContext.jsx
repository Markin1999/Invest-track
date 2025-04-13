import { createContext, useContext, useState, useEffect } from "react";

const VITE_PORT = import.meta.env.VITE_PORT;

export const userContext = createContext();
export const useUserContext = () => useContext(userContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserLogged = async () => {
    const token = sessionStorage.getItem("token");
    console.log("📦 TOKEN trovato:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:${VITE_PORT}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📡 Risposta /user:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore nella risposta:", errorText);
        throw new Error("Errore nel recupero utente");
      }

      const userData = await response.json();
      console.log("✅ Utente caricato:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Errore fetchUserLogged:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLogged();
  }, []);

  return (
    <userContext.Provider value={{ user, loading, fetchUserLogged }}>
      {children}
    </userContext.Provider>
  );
}

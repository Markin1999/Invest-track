import { createContext, useContext, useState, useEffect } from "react";

const VITE_PORT = import.meta.env.VITE_PORT;

export const userContext = createContext();
export const useUserContext = () => useContext(userContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const fetchUserLogged = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:${VITE_PORT}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Errore nel recupero utente");

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Errore nel fetching dati:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserLogged(); // Se c'è un token, carica i dati dell'utente
    }
  }, []);

  return (
    <userContext.Provider value={{ user, fetchUserLogged }}>
      {children}
    </userContext.Provider>
  );
}

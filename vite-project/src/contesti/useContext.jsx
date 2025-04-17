import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VITE_PORT = import.meta.env.VITE_PORT;

export const userContext = createContext();
export const useUserContext = () => useContext(userContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [investimenti, setInvestimenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sezioneI, setSezioneI] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const takeSezioneI = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${VITE_PORT}/sezioneI/${userId}`
      );

      setSezioneI(response.data);
    } catch (error) {
      console.error("Errore nel recupero degli investimenti:", error);
    }
  };

  const takeAllNotes = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${VITE_PORT}/allnotes/${userId}`
      );

      setAllNotes(response.data);
    } catch (error) {
      console.error("Errore nel recupero delle note", error);
      setAllNotes("Errore nel recupero delle note");
    }
  };

  const takeInvestimento = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${VITE_PORT}/invest/${userId}`
      );

      setInvestimenti(response.data);
    } catch (error) {
      console.error("Errore nel recupero degli investimenti:", error);
    }
  };

  const fetchUserLogged = async () => {
    const token = sessionStorage.getItem("token");

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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore nella risposta:", errorText);
        throw new Error("Errore nel recupero utente");
      }

      const userData = await response.json();
      setUser(userData);
      takeInvestimento(userData.id);
      takeSezioneI(userData.id);
      takeAllNotes(userData.id);
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
    <userContext.Provider
      value={{
        user,
        investimenti,
        sezioneI,
        takeInvestimento,
        loading,
        fetchUserLogged,
        allNotes,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useEffect } from "react";

export function Navbar() {
  const { user, loading } = useUserContext();
  if (loading) {
    return <p>🔄 Caricamento utente...</p>;
  }

  if (!user) {
    return <p>🚫 Nessun utente loggato</p>;
  }

  return (
    <nav className="flex justify-between items-center bg-[#1a73e8] px-8 py-4 text-white">
      <div className="flex gap-8">
        <div>
          <h1 className="text-[1.8rem] font-semibold">Invest-Track</h1>
        </div>
        <ul className="flex items-center gap-6 list-none">
          <li>
            {" "}
            <a
              className=" text-white font-medium transition-colors duration-200 ease-in-out hover:text-[#cce2ff]"
              href=""
            >
              Home
            </a>
          </li>
          <li>
            <a
              className=" text-white font-medium transition-colors duration-200 ease-in-out hover:text-[#cce2ff]"
              href=""
            >
              Investimenti
            </a>
          </li>
          <li>
            <a
              className=" text-white font-medium transition-colors duration-200 ease-in-out hover:text-[#cce2ff]"
              href=""
            >
              Statistiche
            </a>
          </li>
          <li>
            <a
              className=" text-white font-medium transition-colors duration-200 ease-in-out hover:text-[#cce2ff]"
              href=""
            >
              Diario
            </a>
          </li>
          <li>
            <a
              className=" text-white font-medium transition-colors duration-200 ease-in-out hover:text-[#cce2ff]"
              href=""
            >
              Notizie
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p>
          Benvenuto, <strong>{user.nome}</strong>{" "}
          <strong>{user.cognome}</strong>
        </p>
      </div>
    </nav>
  );
}

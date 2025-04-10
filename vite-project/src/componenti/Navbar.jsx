import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useEffect } from "react";

export function Navbar() {
  const { user } = useUserContext();

  return (
    <div>
      <div>Invest-Track</div>

      <div>
        <ul>
          <li>Home</li>
          <li>Investimenti</li>
          <li>Statistiche</li>
          <li>Diario</li>
          <li>Notizie</li>
        </ul>
      </div>

      <div>
        <p>
          Benvenuto, <strong>{user.nome}</strong>
        </p>
      </div>
    </div>
  );
}

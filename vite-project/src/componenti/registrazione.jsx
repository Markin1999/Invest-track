import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";

export function Registrazione() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  return (
    <form className="form registrazione" onSubmit={handleSubmit}>
      <label htmlFor="Nome">Nome:</label>
      <input
        type="text"
        name="nome"
        id="nome"
        placeholder="Nome..."
        onChange={handleChange}
        value={data.nome}
        required
      />
      <label htmlFor="Cognome">Cognome:</label>
      <input
        type="text"
        name="cognome"
        id="cognome"
        placeholder="Cognome..."
        onChange={handleChange}
        value={data.cognome}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email..."
        onChange={handleChange}
        value={data.email}
        required
      />
      <label htmlFor="Password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password..."
        onChange={handleChange}
        value={data.password}
        required
      />

      {message && <p className="err-msg"> {message}</p>}

      <button
        className="prosegui"
        disabled={message ? true : false}
        type="submit"
      >
        Avanti
      </button>
      <p>
        Hai già un account?{" "}
        <Link to="/" style={{ color: "#F7A441" }}>
          Login
        </Link>
      </p>
    </form>
  );
}

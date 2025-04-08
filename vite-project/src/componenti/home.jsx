import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const VITE_PORT = import.meta.env.VITE_PORT;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${VITE_PORT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      let responseData;
      try {
        responseData = await response.json();

        const { token } = responseData;
        sessionStorage.setItem("token", token);
      } catch (error) {
        throw new Error(error.message);
      }

      if (!response.ok) {
        setMessage("Errore durante la registrazione.");
        return;
      } else {
        setMessage("login effettuato con successo");
      }

      setMessage("Login effettuato con successo");
    } catch (error) {
      setMessage(`Registrazione fallita: ${error.message}`);
    }
  };

  return (
    <>
      <div>
        <div style={{ backgroundColor: "green" }}>
          <h1>INVE$T-TRACK</h1>
          <h3>
            Controlla in ogni momento i tuoi investimenti e le news a riguardo
          </h3>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <label htmlFor="">E-mail:</label>
            <input
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
            <label htmlFor="">Password:</label>
            <input
              type="text"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
            <button type="submit">Accedi</button>
          </form>
          <hr />
          {message && <p>{message}</p>}
          <hr />
          <Link to="/registrazione">Crea nuovo account!</Link>
        </div>
      </div>
    </>
  );
}

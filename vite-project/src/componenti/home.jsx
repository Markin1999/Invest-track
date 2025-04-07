import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione.");
      }

      const date = await response.json();
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
          <form onSubmit={handleSubmit}>
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
          <Link to="/registrazione">Crea nuovo account!</Link>
        </div>
      </div>
    </>
  );
}

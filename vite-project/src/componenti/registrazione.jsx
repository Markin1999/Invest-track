import { useState } from "react";
import { Link } from "react-router-dom";

export function Registrazione() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (
        value.length < 6 ||
        !/\d/.test(value) ||
        !/[!@#$%^&*()]/.test(value)
      ) {
        setMessage(
          "La password deve contenere almeno sei caratteri di cui almeno un carattere speciale e una lettera maiuscola"
        );
      } else {
        setMessage("");
      }
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/registrazione`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione.");
      }

      const date = await response.json();

      setMessage("Registrazione effettuata con successo");
      setData({
        nome: "",
        cognome: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(`Registrazione fallita: ${error.message}`);
    }
  };
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

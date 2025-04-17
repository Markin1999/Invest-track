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

  const VITE_PORT = import.meta.env.VITE_PORT;

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
      const response = await fetch(
        `http://localhost:${VITE_PORT}/registrazione`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const date = await response.json();
      if (!response.ok) {
        setMessage(`Registrazione fallita: ${date.message}`);
        return;
      }

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
    <div className="flex w-full items-center justify-center h-screen bg-[#1a73e8] px-2 ">
      <div className="bg-white p-6 rounded-lg shadow-md m-16 gap-2 w-[500px]">
        <h1 className="text-[#1a73e8] mb-6 text-[2em] w-full text-center justify-center font-semibold ">
          Registrati a Invest-Track
        </h1>
        <form className="flex flex-col space-y-4 gap-2" onSubmit={handleSubmit}>
          <div className="flex  items-center w-full justify-between">
            <div>
              <label
                htmlFor="Nome"
                className="block text-sm/6 font-semibold text-gray-900 mb-3"
              >
                Nome:
              </label>

              <input
                type="text"
                name="nome"
                className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
                id="nome"
                placeholder="Nome..."
                onChange={handleChange}
                value={data.nome}
                required
              />
            </div>
            <div>
              <label
                htmlFor="Cognome"
                className="block text-sm/6 font-semibold text-gray-900 mb-3"
              >
                Cognome:
              </label>
              <input
                type="text"
                name="cognome"
                id="cognome"
                className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
                placeholder="Cognome..."
                onChange={handleChange}
                value={data.cognome}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-gray-900 mb-3"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="Email..."
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-sm/6 font-semibold text-gray-900 mb-3"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="Password..."
              onChange={handleChange}
              value={data.password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffd600] text-[#111] rounded-2xl py-2 mt-6 font-semibold mx-auto px-6"
          >
            Avanti
          </button>
          <hr className="my-2" />
          {message && <p className="m-1 text-center">{message}</p>}
          {message && <hr className="my-2" />}

          <div className="m-1 w-full items-center flex justify-center gap-1 mt-4 text-[0.9rem]">
            <p>Hai già un account?</p>
            <Link
              to="/"
              className="inline-block text-[#1a73e8] hover:underline text-[0.9rem]"
            >
              Accedi
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

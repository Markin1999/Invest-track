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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mt-10 text-center text-7xl/6 font-bold tracking-tight text-green-600">
          INVE$T-TRACK
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label
            htmlFor="Nome"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Nome:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="nome"
              className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              id="nome"
              placeholder="Nome..."
              onChange={handleChange}
              value={data.nome}
              required
            />
          </div>

          <label
            htmlFor="Cognome"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Cognome:
          </label>
          <input
            type="text"
            name="cognome"
            id="cognome"
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Cognome..."
            onChange={handleChange}
            value={data.cognome}
            required
          />
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Email..."
            onChange={handleChange}
            value={data.email}
            required
          />
          <label
            htmlFor="Password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Password..."
            onChange={handleChange}
            value={data.password}
            required
          />
          <button
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={message ? true : false}
            type="submit"
          >
            Avanti
          </button>
          <hr className="my-2" />
          {message && <p className="m-1 text-center">{message}</p>}
          <hr className="my-2" />

          <div className="m-1 justify-center flex gap-2">
            <p>Hai gia un account?</p>
            <Link to="/" className="text-green-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

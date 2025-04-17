import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";

export function Home() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const { fetchUserLogged } = useUserContext();

  const navTo = useNavigate();

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

        await fetchUserLogged();
      } catch (error) {
        throw new Error(error.message);
      }

      if (!response.ok) {
        setMessage(`Accesso fallito: ${responseData.message}`);
        return;
      } else {
        navTo("/totalpage");
      }

      setMessage("Login effettuato con successo");
    } catch (error) {
      setMessage(`Registrazione fallita: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center h-screen bg-[#1a73e8] px-2 ">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm m-16 gap-2">
          <h1 className="text-[#1a73e8] mb-6 text-[2em] w-full text-center justify-center font-semibold">
            Invest-Track
          </h1>
          <form
            className="flex flex-col space-y-4 gap-2"
            onSubmit={handleLogin}
          >
            <label htmlFor="" className="font-semibold">
              E-mail:
            </label>
            <input
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
            />
            <label htmlFor="" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={login.password}
              placeholder="Inserisci la tua password"
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className="w-full bg-[#ffd600] text-[#111] rounded-2xl py-2 mt-6 font-semibold mx-auto px-6"
            >
              Accedi
            </button>
          </form>

          {message && <p className="m-1 text-center">{message}</p>}
          {message && <hr className="my-2" />}
          <div className="m-1 w-full items-center flex justify-center gap-1 mt-4 text-[0.9rem]">
            <p>Non hai un Account?</p>
            <Link
              to="/registrazione"
              className="inline-block text-[#1a73e8] hover:underline text-[0.9rem]"
            >
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

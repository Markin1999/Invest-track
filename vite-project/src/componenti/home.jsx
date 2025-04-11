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
      <div className="flex w-full items-center justify-between h-screen bg-gray-100 px-2 ">
        <div className="rounded-lg w-full m-16">
          <h1 className="text-green-600 text-6xl mb-4 font-semibold">
            INVE$T-TRACK
          </h1>
          <h3 className="text-[1.5rem] text-gray-700 font-medium">
            Controlla in ogni momento i tuoi investimenti e le news a riguardo!
          </h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm m-16 gap-2">
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <label htmlFor="">E-mail:</label>
            <input
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="">Password:</label>
            <input
              type="text"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 w-fit mx-auto px-6"
            >
              Accedi
            </button>
          </form>
          <hr className="my-2" />
          {message && <p className="m-1 text-center">{message}</p>}
          {message && <hr className="my-2" />}
          <div className="m-1 text-center">
            <Link
              to="/registrazione"
              className="inline-block text-green-600 hover:underline"
            >
              Crea nuovo account!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

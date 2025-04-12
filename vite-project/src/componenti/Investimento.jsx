import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
const VITE_PORT = import.meta.env.VITE_PORT;
export function Investimento() {
  const [data, setData] = useState({
    date: "",
    ora: "",
    nome: "",
    quantita: "",
    Prezzo_Azione: "",
    totale: "",
  });

  const [message, setMessage] = useState("");
  const [suggerimenti, setSuggerimenti] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrezzoStorico = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${VITE_PORT}/storico`,
        {
          nome: data.nome,
          data: data.date,
          ora: data.ora,
        }
      );

      const prezzo = response.data.close;

      setData((prev) => ({ ...prev, Prezzo_Azione: prezzo.toFixed(2) })); // o gestisci come preferisci
    } catch (error) {
      console.error("Errore nella chiamata al backend:", error);
    }
  };

  const handleSearchName = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${VITE_PORT}/searchNome`,
        {
          nome: data.nome, // oppure qualunque sia il tuo input
        }
      );

      const risultati = response.data.quotes || [];

      setSuggerimenti(risultati); // o gestisci come preferisci
    } catch (error) {
      console.error("Errore nella chiamata al backend:", error);
    }
  };

  return (
    <>
      <Navbar />
      {/* Nuvoletta */}
      <div className="flex flex-col items-center mt-10 space-y-3">
        <div className="relative bg-white text-gray-800 p-5 rounded-2xl shadow-xl max-w-xs text-center font-semibold">
          <div>
            <p>
              Ti consiglio di calcolare automaticamente il prezzo per azione per
              essere molto piu precisi, ti basta compilare tutti i campi sopra.
            </p>
          </div>
          {/* Triangolino */}
          <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* Cerchio con operatore */}
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
          😊
        </div>
      </div>
      {/*Fine */}
      <header className="relative bg-[linear-gradient(135deg,_#1a73e8,_#3eaaf7)] px-4 pt-8 pb-16 text-white overflow-hidden">
        <div className="max-w-[1200px] m-auto relative z-20 text-center">
          <h2 className="items-center text-[2rem] mb-4 font-semibold">
            Investi nel tuo futuro
          </h2>
          <p className="text-[1rem] mb-6 font-semibold max-w-[600px] ml-auto mr-auto leading-[1.5]">
            Gestisci al meglio il tuo portafoglio inserendo ogni dettaglio con
            precisione.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            className="block w-full h-[120px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              fill-opacity="1"
              d="M0,256L34.3,234.7C68.6,213,137,171,206,160C274.3,149,343,171,411,170.7C480,171,549,149,617,128C685.7,107,754,85,823,85.3C891.4,85,960,107,1029,128C1097.1,149,1166,171,1234,181.3C1302.9,192,1371,192,1406,192L1440,192L1440,320L1405.7,320C1371.4,320,1302,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,685,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>
      <div
        className=" w-full m-w- max-w-[650px]
      bg-white
      shadow-[0px_8px_18px_rgba(0,0,0,0.1)]
      relative
      mx-auto
      -mt-8
      mb-12
      rounded-[10px]
      p-8
      border-t-[8px]
      border-t-[#ffd600]"
      >
        <form className="space-y-5 ">
          <h2 className="text-center text-[#1a73e8] text-[1.5em] mb-[1.5rem] font-semibold ">
            Dettagli dell'investimento
          </h2>

          <div className="flex justify-between gap-10">
            <div className="w-full ">
              <label
                className="block text-sm/6 font-semibold text-gray-900"
                for="datetime-investimento"
              >
                Data dell'investimento
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  className="block border  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="w-full ">
              <label
                className="block text-sm/6 font-semibold text-gray-900"
                for="datetime-investimento"
              >
                Ora dell'investimento
              </label>
              <div className="mt-2">
                <input
                  type="time"
                  name="ora"
                  value={data.ora}
                  onChange={handleChange}
                  className="block border  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="Nome"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Nome azienda *
              </label>
              <button
                type="button"
                onClick={handleSearchName}
                className="bg-[#ffd600] text-black px-5 py-2 rounded-md font-semibold text-sm tracking-wide shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-[2px] hover:bg-yellow-400 active:translate-y-0 active:shadow-inner"
              >
                🔍 Cerca
              </button>
            </div>

            <div className="mt-2">
              <input
                type="text"
                name="nome"
                value={data.nome}
                onChange={handleChange}
                className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                placeholder="Es. Apple, Google, ecc."
                required
              />
            </div>
            {suggerimenti.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {suggerimenti.map((item) => (
                  <li
                    key={item.symbol}
                    onClick={() => {
                      setData((prev) => ({ ...prev, nome: item.symbol }));
                      setSuggerimenti([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <strong>{item.symbol}</strong> —{" "}
                    {item.shortname || item.name} ({item.exchange || "USA"})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label
            htmlFor="quantita"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Quantità di azioni: *
          </label>
          <input
            type="number"
            name="quantita"
            value={data.quantita}
            onChange={handleChange}
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Es. 10, 100, ecc."
            required
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor="prezzo"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Prezzo per azione *
            </label>
            <button
              type="button"
              onClick={handlePrezzoStorico}
              className="bg-[#ffd600] text-[#333] px-[1rem] py-[0.4rem] border-none rounded-[6px] font-semibold text-[0.8rem] cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
            >
              Calcola automaticamente
            </button>
          </div>
          <input
            type="number"
            name="Prezzo_Azione"
            value={data.Prezzo_Azione}
            onChange={handleChange}
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Es, 125.50"
            required
          />

          <label
            htmlFor="totale"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Totale investito
          </label>
          <input
            type="number"
            name="totale"
            value={data.totale}
            onChange={handleChange}
            className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            placeholder="Calcolato automaticamente o modificabile."
            required
          />

          <div className="flex gap-2">
            <button className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Annulla
            </button>
            <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Salva investimento
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

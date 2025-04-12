import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useUserContext } from "../contesti/useContext";
const VITE_PORT = import.meta.env.VITE_PORT;
export function Investimento() {
  const { user } = useUserContext();

  const [data, setData] = useState({
    date: "",
    ora: "",
    nome: "",
    quantita: "",
    Prezzo_Azione: "",
    totale: "",
  });

  const [message, setMessage] = useState(
    `Ehi ciao ${user.nome}! Mi raccomando: compila tutti i campi, cerca il nome corretto dell'azienda, inserisci data e ora per calcolare con precisione il valore del tuo investimento.`
  );

  const [suggerimenti, setSuggerimenti] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const quantita = data.quantita;
    const prezzo = data.Prezzo_Azione;

    if (
      typeof quantita === "number" ||
      (typeof quantita === "string" && !isNaN(Number(quantita)))
    ) {
      if (
        typeof prezzo === "number" ||
        (typeof prezzo === "string" && !isNaN(Number(prezzo)))
      ) {
        const totale = Number(quantita) * Number(prezzo);

        setData((prev) => ({
          ...prev,
          totale: Number(totale.toFixed(2)),
        }));
      }
    }
  }, [data.quantita, data.Prezzo_Azione]);

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
      if (!response.data.ok) {
        setMessage(
          "Dati mancanti: Inserisci data dell'investimento, ora dell'investimento e cerca il nome dell'azione"
        );
      }

      const prezzo = response.data.close;

      setData((prev) => ({ ...prev, Prezzo_Azione: prezzo.toFixed(2) })); // o gestisci come preferisci
    } catch (error) {
      console.error("Errore nella chiamata al backend:", error);
      setMessage(
        error.response?.data?.message ||
          "⚠️ Dati mancanti: Verifica che data, ora e nome siano corretti, e che il mercato fosse aperto in quel momento"
      );
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
      <div className=" w-screen flex justify-between items-center gap-5 px-10">
        <div className="basis-0 grow flex justify-center">
          <div className="max-w-[700px] w-full bg-white shadow-2xl rounded-xl p-8 border-t-[8px] border-[#ffd600] space-y-6">
            <form className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-indigo-600">
                📈 Dettagli Investimento
              </h2>

              <div className="space-y-2 relative">
                <label className="text-gray-800 font-medium">
                  Nome azienda *
                </label>
                {/* Sotto il campo Nome Azienda */}
                {suggerimenti.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                    {suggerimenti.map((item) => (
                      <li
                        key={item.symbol}
                        onClick={() => {
                          setData((prev) => ({ ...prev, nome: item.symbol }));
                          setSuggerimenti([]);
                        }}
                        className="px-4 py-2 hover:bg-indigo-100 cursor-pointer transition"
                      >
                        <strong>{item.symbol}</strong> —{" "}
                        {item.shortname || item.name} ({item.exchange || "USA"})
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    name="nome"
                    value={data.nome}
                    onChange={handleChange}
                    placeholder="Es. Apple, Google, ecc."
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleSearchName}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all shadow-sm"
                  >
                    🔍 Cerca
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-800 font-medium">
                  Data investimento *
                </label>
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-800 font-medium">
                  Quantità di azioni *
                </label>
                <input
                  type="number"
                  name="quantita"
                  value={data.quantita}
                  onChange={handleChange}
                  placeholder="Es. 10, 100, ecc."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-800 font-medium">
                  Prezzo per azione ($) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="Prezzo_Azione"
                    value={data.Prezzo_Azione}
                    onChange={handleChange}
                    placeholder="Es. 125.50"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handlePrezzoStorico}
                    className="bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-all shadow-sm text-sm"
                  >
                    ⚡️ Calcola
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-800 font-medium">
                  Totale investito ($) *
                </label>
                <input
                  type="number"
                  name="totale"
                  value={data.totale}
                  onChange={handleChange}
                  placeholder="Calcolato automaticamente o modificabile."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() =>
                    setData({
                      date: "",
                      ora: "",
                      nome: "",
                      quantita: "",
                      Prezzo_Azione: "",
                      totale: "",
                    })
                  }
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                >
                  Cancella
                </button>
                <button className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition">
                  Salva Investimento
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Nuvoletta */}
        <div className="absolute right-40 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
          {/* Messaggio */}
          <div className="relative bg-white p-6 rounded-xl shadow-2xl max-w-xs text-center font-medium border border-gray-100">
            <p className="text-gray-700">{message}</p>

            {/* Triangolino */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-100"></div>
          </div>

          {/* Avatar operatore */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-3xl shadow-lg hover:scale-105 transition-transform duration-300">
            😊
          </div>
        </div>

        {/*Fine */}
      </div>
    </>
  );
}

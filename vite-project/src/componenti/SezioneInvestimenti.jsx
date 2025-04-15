import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { Navbar } from "./Navbar";
import Footer from "./footer";
import { useEffect } from "react";

export function SezioneInvestimenti() {
  const { sezioneI, user, loading } = useUserContext();

  const navTo = useNavigate();

  if (!user) {
    navTo("/");
  }

  const datiConDataPulita = sezioneI.map((element) => ({
    ...element,
    date: element.date ? element.date.split("T")[0] : "Data non disponibile",
  }));

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
      <div className="mt-[-6px] z-20 max-w-[1200px] m-auto bg-white shadow-2xl rounded-xl p-8 border-t-[12px] border-[#00ff22]">
        <h2 className="text-center text-[1.6rem] mb-[2rem] font-semibold text-[#333]">
          Elenco degli investimenti
        </h2>

        {/* intestazione */}
        <div className="grid grid-cols-6 bg-[#1a73e8] text-white font-semibold px-4 py-3 rounded-t-lg text-sm">
          <div>Nome</div>
          <div>Data</div>
          <div>Quantità</div>
          <div>Prezzo</div>
          <div>Totale</div>
          <div>Azioni</div>
        </div>

        {/* righe */}
        {datiConDataPulita && datiConDataPulita.length > 0 ? (
          datiConDataPulita.map((x, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center px-4 py-3 border-b border-[#eee] text-sm"
            >
              <div>{x.nome}</div>
              <div>{x.date}</div>
              <div>{x.quantita}</div>
              <div>$ {x.prezzo_azione}</div>
              <div>$ {x.totale}</div>
              <div>
                <button className="inline-block px-3 py-1.5 mr-2 rounded text-[0.9rem] transition duration-200 bg-[#f0f0f0] text-[#333] hover:bg-[#e0e0e0] hover:-translate-y-[1px]">
                  Modifica
                </button>
                <button className="inline-block px-3 py-1.5 rounded text-[0.9rem] transition duration-200 bg-red-500 text-white hover:bg-red-400 hover:-translate-y-[1px]">
                  Elimina
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-sm">
            Nessun investimento disponibile.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

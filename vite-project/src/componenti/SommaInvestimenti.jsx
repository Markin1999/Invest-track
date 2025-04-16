import { useEffect, useState } from "react";
import { useUserContext } from "../contesti/useContext";

const p = "mb-1 text-[#555] font-normal ";

const div = "grid gap-6 grid-flow-col auto-cols-[400px] mx-4 py-4 ";

export function SommaInvestimenti({ investimenti, setTakeNota }) {
  const saveNote = (index) => {
    setTakeNota({ set: true, index: index });
  };

  return (
    <section>
      <h2 className="text-center text-[1.6rem] my-[2rem] font-semibold text-[#333]">
        I tuoi Investimenti Attivi
      </h2>
      <div className="overflow-x-auto mx-auto max-w-screen-xl p-1 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] rounded-[12px]">
        <div className={div}>
          {investimenti.map((x, index) => (
            <div
              key={index}
              className="bg-white p-6 hover:border-[2px] hover:border-[#ffd600] rounded-[12px] transition duration-200 hover:scale-[1.01] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:translate-y-[-2px]"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-xl text-[#1a73e8]">
                  {x.nome}
                </h3>
                <span
                  className={
                    Number(x.differenzapercentuale) > 0
                      ? "inline-block py-[0.2rem] px-[0.6rem] text-[0.9rem] text-white bg-green-500"
                      : "inline-block py-[0.2rem] px-[0.6rem] text-[0.9rem] text-white bg-red-500"
                  }
                >
                  <i
                    className={
                      Number(x.differenzapercentuale) > 0
                        ? "fas fa-arrow-up"
                        : "fas fa-arrow-down"
                    }
                  ></i>{" "}
                  {Number(x.differenzapercentuale).toFixed(1)} %
                </span>
              </div>

              <p className={p} style={{ fontFamily: "Roboto, sans-serif" }}>
                <strong>Importo:</strong> $ {x.totaleinvestito}
              </p>
              <p className={p} style={{ fontFamily: "Roboto, sans-serif" }}>
                <strong>Quantità:</strong> {x.quantita_totale}
              </p>
              <p className={p} style={{ fontFamily: "Roboto, sans-serif" }}>
                <strong>Guadagno:</strong> $ {Number(x.guadagno).toFixed(2)}
              </p>
              <p className={p} style={{ fontFamily: "Roboto, sans-serif" }}>
                <strong>Totale Importo:</strong> ${" "}
                {(Number(x.totaleinvestito) + Number(x.guadagno)).toFixed(2)}
              </p>
              <div className="mt-[1rem] flex gap-[0.5rem] ">
                <button
                  type="button"
                  onClick={() => saveNote(x.id)}
                  className="bg-[#f0f0f0] text-[#333] transition-transform duration-200 ease-in-out border-none py-[0.5rem] px-[1rem] cursor-pointer text-[0.9rem] hover:bg-[#e0e0e0] hover:translate-y-[-1px]"
                >
                  <i className="fas fa-comment"></i> Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

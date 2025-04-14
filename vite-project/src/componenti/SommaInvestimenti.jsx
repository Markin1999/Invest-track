import { useEffect } from "react";
import { useUserContext } from "../contesti/useContext";

const p = "mb-1 text-[#555] font-normal ";

const div = "grid gap-6 grid-flow-col auto-cols-[400px] mx-8 ";

export function SommaInvestimenti() {
  const { investimenti, takeinvestimento } = useUserContext();

  useEffect(() => {
    takeinvestimento;
  }, []);

  return (
    <section>
      <h2 className="text-center text-[1.6rem] my-[2rem] font-semibold text-[#333]">
        I tuoi Investimenti Attivi
      </h2>
      <div className="overflow-x-auto mx-auto px-4 max-w-screen-xl">
        <div className={div}>
          {investimenti.map((x, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-[12px]  border-[2px] transition duration-200 hover:scale-[1.01] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:translate-y-[-2px]"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-xl text-[#1a73e8]">
                  {x.nome}
                </h3>
                <span className="inline-block py-[0.2rem] px-[0.6rem] text-[0.9rem] text-white bg-black">
                  <i className="fas fa-arrow-up"></i> +5%
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
                <button className="bg-[#f0f0f0] text-[#333] transition-transform duration-200 ease-in-out border-none py-[0.5rem] px-[1rem] cursor-pointer text-[0.9rem] hover:bg-[#e0e0e0] hover:translate-y-[-1px] ">
                  <i className="fas fa-edit"></i> Modifica
                </button>
                <button className="bg-[#f0f0f0] text-[#333] transition-transform duration-200 ease-in-out border-none py-[0.5rem] px-[1rem] cursor-pointer text-[0.9rem] hover:bg-[#e0e0e0] hover:translate-y-[-1px]">
                  <i class="fas fa-comment"></i> Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

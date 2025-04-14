export function SituazioneAttuale({ investimenti }) {
  const totale = investimenti.reduce(
    (somma, item) => somma + parseFloat(item.totaleinvestito),
    0
  );
  const guadagno = investimenti.reduce(
    (somma, item) => somma + parseFloat(item.guadagno),
    0
  );
  const attuale = totale + guadagno;

  return (
    <section className="flex flex-wrap gap-[1rem] mb-[3rem] justify-center mx-auto px-4 max-w-screen-xl">
      <div className="bg-white min-w-[250px] flex-1 px-6 py-4 rounded-[12px] text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in border-l-[6px] border-[#1a73e8]">
        <h3 className="text-base mb-2 text-[#666] font-medium">
          Totale investito
        </h3>{" "}
        <p className="text-[1.6rem] font-semibold text-[#1a73e8]">
          $ {totale.toFixed(2)}
        </p>
      </div>
      <div className="bg-white min-w-[250px] flex-1 px-6 py-4 rounded-[12px] text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in border-l-[6px] border-[#28a745]">
        <h3 className="text-base mb-2 text-[#666] font-medium">Guadagno</h3>{" "}
        <p className="text-[1.6rem] font-semibold text-[#1a73e8]">
          $ {guadagno.toFixed(2)}
        </p>
      </div>
      <div className="bg-white min-w-[250px] flex-1 px-6 py-4 rounded-[12px] text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in border-l-[6px] border-[#ff9100]">
        <h3 className="text-base mb-2 text-[#666] font-medium">
          Valore attuale
        </h3>
        <p className="text-[1.6rem] font-semibold text-[#1a73e8]">
          $ {attuale.toFixed(2)}{" "}
        </p>
      </div>
    </section>
  );
}

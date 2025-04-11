export function Header() {
  return (
    <header className="relative bg-[linear-gradient(135deg,_#1a73e8,_#3eaaf7)] px-4 pt-8 pb-16 text-white overflow-hidden">
      <div className="max-w-[1200px] m-auto relative z-20 text-center">
        <h2 className="items-center text-[2rem] mb-4 font-semibold">
          Gestione investimenti
        </h2>
        <p className="text-[1rem] mb-6 font-semibold max-w-[600px] ml-auto mr-auto leading-[1.5]">
          Benvenuto nella tua dashboard personale. Tieni traccia dei tuoi
          investimenti, con le ultime notizie dal mondo, monitora i guadagni e
          annota le tue strategie.
        </p>

        <button className="bg-[#ffd600] text-[#333] px-[1.2rem] py-[0.8rem] border-none rounded-[6px] font-semibold text-[1rem] cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
          <i className="fas fa-plus-circle"></i> Aggiungi Nuovo Investimento
        </button>
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
  );
}

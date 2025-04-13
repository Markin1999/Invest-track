import { useUserContext } from "../contesti/useContext";

export function SommaInvestimenti() {
  const { investimenti } = useUserContext();

  return (
    <section>
      <h2>I tuoi Investimenti Attivi</h2>
      <div className="flex">
        {investimenti.map((x, index) => (
          <div key={index}>
            <div>
              <h3>{x.nome}</h3>
              <span>
                <i className="fas fa-arrow-up"></i> +5%
              </span>
            </div>
            <p>
              <strong>Importo:</strong> 33
            </p>
            <p>
              <strong>Quantità:</strong> 30
            </p>
            <p>
              <strong>Prezzo medio:</strong> €100
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

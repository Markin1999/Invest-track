import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <div style={{ backgroundColor: "green" }}>
          <h1>INVE$T-TRACK</h1>
          <h3>
            Controlla in ogni momento i tuoi investimenti e le news a riguardo
          </h3>
        </div>
        <div>
          <div>
            <label htmlFor="">E-mail:</label>
            <input type="text" name="email" onChange={handleChange} />
            <label htmlFor="">Password:</label>
            <input type="text" name="password" onChange={handleChange} />
            <button>Accedi</button>
          </div>
          <hr />
          <Link to="/registrazione">Crea nuovo account!</Link>
        </div>
      </div>
    </>
  );
}

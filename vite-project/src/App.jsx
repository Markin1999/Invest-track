import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./componenti/home";
import { Registrazione } from "./componenti/registrazione";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registrazione" element={<Registrazione />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

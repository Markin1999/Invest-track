import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./componenti/home";
import { Registrazione } from "./componenti/registrazione";
import { UserProvider } from "./contesti/useContext";
import { Navbar } from "./componenti/Navbar";
import { Header } from "./componenti/Header";
import { TotalPage } from "./componenti/TotalPage";
import { Investimento } from "./componenti/Investimento";
import { SezioneInvestimenti } from "./componenti/SezioneInvestimenti";

function App() {
  return (
    <div className="bg-[#f2f4f8] flex flex-col min-h-screen">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registrazione" element={<Registrazione />}></Route>
            <Route path="/totalpage" element={<TotalPage />}></Route>
            <Route path="/investimento" element={<Investimento />}></Route>
            <Route
              path="/sezioneInvestimenti"
              element={<SezioneInvestimenti />}
            ></Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

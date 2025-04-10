import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./componenti/home";
import { Registrazione } from "./componenti/registrazione";
import { UserProvider } from "./contesti/useContext";
import { Navbar } from "./componenti/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registrazione" element={<Registrazione />}></Route>
            <Route path="/navbar" element={<Navbar />}></Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { Header } from "./Header";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import Footer from "./footer";

export function TotalPage() {
  const { user, investimenti } = useUserContext();

  const navTo = useNavigate();

  if (!user || !investimenti) {
    navTo("/");
  }
  return (
    <div>
      <Navbar />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

import { useUserContext } from "../contesti/useContext";
import { Header } from "./Header";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { SommaInvestimenti } from "./SommaInvestimenti";
import Footer from "./footer";

export function TotalPage() {
  const { loading } = useUserContext();

  return (
    <div className="m-0 p-0">
      <Navbar />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

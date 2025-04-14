import { useUserContext } from "../contesti/useContext";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { SommaInvestimenti } from "./SommaInvestimenti";

export function TotalPage() {
  const { loading } = useUserContext();


  return (
    <>
      <Navbar />
      <Header />
      <SommaInvestimenti />
    </>
  );
}

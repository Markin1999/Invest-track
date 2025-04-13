import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { SommaInvestimenti } from "./SommaInvestimenti";

export function TotalPage() {
  return (
    <>
      <Navbar />
      <Header />
      <SommaInvestimenti />
    </>
  );
}

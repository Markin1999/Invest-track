import { useEffect } from "react";
import { useUserContext } from "../contesti/useContext";
import { SommaInvestimenti } from "./SommaInvestimenti";
import { SituazioneAttuale } from "./SituazioneAttuale";

export function Main() {
  const { investimenti } = useUserContext();

  return (
    <>
      <div className="mt-[-3rem] relative z-30 ">
        <SituazioneAttuale investimenti={investimenti} />
        <SommaInvestimenti investimenti={investimenti} />
      </div>
    </>
  );
}

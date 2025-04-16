import { useEffect, useState } from "react";
import { useUserContext } from "../contesti/useContext";
import { SommaInvestimenti } from "./SommaInvestimenti";
import { SituazioneAttuale } from "./SituazioneAttuale";
import { Note } from "./Note";
import axios from "axios";
const VITE_PORT = import.meta.env.VITE_PORT;
export function Main() {
  const { investimenti, user } = useUserContext();
  const [takeNota, setTakeNota] = useState({ set: false, index: "" });
  const [nome, setNome] = useState("");

  const takeNome = async () => {
    console.log(user.id, takeNota.index);
    try {
      const response = await axios.post(
        `http://localhost:${VITE_PORT}/takenome/${user.id}`,
        {
          index: Number(takeNota.index),
        }
      );

      setNome(response.data);
    } catch (error) {
      console.error("Errore nel recupero degli investimenti:", error);
    }
  };

  useEffect(() => {
    if (takeNota.set) {
      takeNome();
    }
  }, [takeNota.set]);

  return (
    <>
      <div className="mt-[-3rem] relative z-30 ">
        <SituazioneAttuale investimenti={investimenti} />
        <SommaInvestimenti
          investimenti={investimenti}
          setTakeNota={setTakeNota}
        />
        <Note />
      </div>
      {takeNota.set && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white w-[90%] max-w-[700px] p-[2rem] rounded-2xl relative ">
            <div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-white hover:border-white focus:border-white"
                  onClick={() => setTakeNota({ set: false, index: "" })}
                >
                  &times;
                </button>
              </div>

              <h2 className="text-center mx-[1rem] text-[#333] text-[1.6rem] font-semibold ">
                {nome ? nome : "Aggiungi nota"}
              </h2>
              <textarea
                className=" border rounded-xl hover:border-[#ffd600] hover:border-[2px] border-[#ccc] resize-none p-4 m-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] focus:outline-none w-full h-[300px] text-[1rem]"
                placeholder="Scrivi qui la tua nota..."
              ></textarea>
              <div>
                <div className="w-full flex justify-end">
                  <button className=" bg-[#ffd600] text-[#333] font-medium py-2 px-6 rounded-xl hover:bg-yellow-400 transition">
                    Salva
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

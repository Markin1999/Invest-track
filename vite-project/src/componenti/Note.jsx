import { useEffect, useState } from "react";
import { useUserContext } from "../contesti/useContext";

export function Note() {
  const { allNotes } = useUserContext();

  if (allNotes) {
    allNotes.forEach((element) => {
      if (element.created_at instanceof Date) {
        element.created_at = element.created_at.toISOString().split("T")[0];
      } else if (typeof element.created_at === "string") {
        element.created_at = element.created_at.split("T")[0];
      }
    });
  }

  return (
    <section className="overflow-x-auto max-w-[1200px] max-h-[400px] p-[2rem] mx-auto mt-[3rem] shadow-lg bg-white text-center rounded-[12px] ">
      <h2 className="font-semibold text-[1.6rem] text-[#333] mb-[3rem]">
        Note dal tuo Diario
      </h2>
      <div className="w-full">
        {allNotes ? (
          allNotes.map((x, index) => (
            <div key={index} className="mb-[1.5rem]">
              <div className="flex gap-2">
                <h3 className="text-[1.1rem] mb-[0.3rem] text-gray-400">
                  {x.created_at}
                </h3>
                <h3 className="text-[1.1rem] text-[#1a73e8] font-semibold mb-[0.3rem]">
                  {x.title}
                </h3>
              </div>

              <p className="text-start bg-[#f9f9f9] rounded-lg text-[#555] p-[1rem] leading-6 font-medium">
                {x.contenuto}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full">
            <div>
              <div className="flex gap-2">
                <h3 className="text-[1.1rem] mb-[0.3rem]">00/00/00</h3>
                <h3 className="text-[1.1rem] text-[#1a73e8] font-semibold mb-[0.3rem]">
                  Azienda
                </h3>
              </div>

              <p className="text-start bg-[#f9f9f9] rounded-lg text-[#555] p-[1rem] leading-6 font-medium">
                Note...
              </p>
            </div>

            <div>
              <div className="flex gap-2">
                <h3 className="text-[1.1rem] mb-[0.3rem]">00/00/00</h3>
                <h3 className="text-[1.1rem] text-[#1a73e8] font-semibold mb-[0.3rem]">
                  Azienda
                </h3>
              </div>

              <p className="text-start bg-[#f9f9f9] rounded-lg text-[#555] p-[1rem] leading-6 font-medium">
                Note...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

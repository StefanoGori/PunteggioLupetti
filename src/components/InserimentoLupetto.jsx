import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Scout.css";

function InserimentoLupetto() {
  const [Nome, setNome] = useState("");
  const [Cognome, setCognome] = useState("");
  const [AnnoNascita, setAnnoNascita] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleclick = async () => {
    const payload = {
      Nome,
      Cognome,
      AnnoNascita: parseInt(AnnoNascita),
      Punteggio: parseInt(0),
    };
    await addDoc(collection(db, "Lupetti"), payload);
    document.getElementById("nome").value = "";
    document.getElementById("cognome").value = "";
    document.getElementById("annonascita").value = 0;
  };
  return (
    <div className="flex h-full bg-gray-100">
      <div
        className={
          '${sidebarOpen ? "" : "hidden"} w-64 bg-white border-r md:block'
        }
      >
        {" "}
        <div className="hidden w-64 bg-white border-r md:block">
          {" "}
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 p-6">
              <div className="flex flex-col flex-1">
                <div className="flex items-center flex-shrink-0 mb-2">
                  <img
                    className="w-auto h-8"
                    src="../../logobrancaL.png"
                    alt="Workflow"
                  />
                  <span className="ml-2 text-xl font-semibold text-gray-800 ">
                    BRANCA L
                  </span>
                </div>
                <button
                  className="p-1 ml-2 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">
                    {sidebarOpen ? "Close sidebar" : "Open sidebar"}
                  </span>
                  {sidebarOpen ? (
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="block text-gray-500 text-xs uppercase font-medium mb-2 border-t-2 pt-2">
                    Modifica lupetti
                  </span>
                  <Link
                    to="/inserimento-lupetto"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Inserisci nuovo lupetto
                  </Link>
                  <Link
                    to="/cancella-lupetto"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Cancella lupetto
                  </Link>
                  <Link
                    to="/scout"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Stampa lupetti con punteggio
                  </Link>
                  <Link
                    to="/modifica-lupetto"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Modifica punteggio lupetto
                  </Link>
                  <Link
                    to="/ricerca-lupetto"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Ricerca lupetto
                  </Link>
                </div>
                <div className="flex flex-col mt-2 border-t-2 pt-2">
                  <span className="block text-gray-500 text-xs uppercase font-medium mb-2">
                    Modificatori
                  </span>
                  <Link
                    to="/inserimento-modificatore"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Aggiunta
                  </Link>
                  <Link
                    to="/modifica-punteggio-modificatore"
                    className="block py-2.5 px-4 text-sm hover:bg-gray-50"
                  >
                    Modifica punteggio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center h-screen pl-20">
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
          class="w-full border border-gray-400 p-2 rounded mb-4"
          id="nome"
        />
        <input
          type="text"
          placeholder="Cognome"
          onChange={(e) => setCognome(e.target.value)}
          class="w-full border border-gray-400 p-2 rounded mb-4"
          id="cognome"
        />
        <input
          type="number"
          placeholder="Anno di nascita"
          onChange={(e) => setAnnoNascita(e.target.value)}
          class="w-full border border-gray-400 p-2 rounded mb-4"
          id="annonascita"
        />
        <button
          onClick={handleclick}
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Inserisci
        </button>
      </div>
    </div>
  );
}

export default InserimentoLupetto;

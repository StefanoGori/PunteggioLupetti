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
const Scout = () => {
  const [Lupetti, setLupetti] = useState([]);
  const [Nome, setNome] = useState("");
  const [Cognome, setCognome] = useState("");
  const [AnnoNascita, setAnnoNascita] = useState(0);
  const [Tipo, setTipo] = useState("");
  const [Punteggio, setPunteggio] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const Lupetti = onSnapshot(collection(db, "Lupetti"), (snapshot) => {
      const a = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => a.Punteggio - b.Punteggio);
      setLupetti(a);
    });
  }, []);
  const handleclick = async () => {
    const payload = { Tipo, Punteggio: parseInt(Punteggio) };
    await addDoc(collection(db, "Modificatori"), payload);
    setTipo("");
    setPunteggio(0);
    document.getElementById("tipo").value = "";
    document.getElementById("punteggio").value = 0;
  };


  return (
    <div className="flex h-full bg-gray-100">
      <div className={'sidebar ${sidebarOpen ? "" : "hidden"} w-64 bg-white border-r md:block'}>
          {""}
          <div className="hidden w-64 bg-white border-r md:block">
            {""}
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
                    to="/modifica-punteggio"
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
        
      <div className="flex-1">
        <div className="container">
          <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cognome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Punteggio
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Lupetti.map((lupetto) => (
                    <tr key={lupetto.id}>
                      <td className="p-2">{lupetto.Nome}</td>
                      <td>{lupetto.Cognome}</td>
                      <td>{lupetto.Punteggio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    // {/* <div>Scout
    // <input type='text' onChange={(e)=>{setTipo(e.target.value)}} id='tipo'></input>
    // <input type='number'onChange={(e)=>{setPunteggio(e.target.value)}} id='punteggio'></input>
    // <button onClick={handleclick}>invia</button>
    // </div> */}
  );
};
export default Scout;

//inserimento nuovo lupetto
//cancellazione vecchio lupetto
//modifica punteggio lupetto
//modifica modificatori(aggiunta, modificaPunteggio)
//inserimento nuovo modificatore
//ricerca lupetto con nome,cognome

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Scout.css";

function RicercaLupetto() {
  const [Cognome, setCognome] = useState("");
  const [Nome, setNome] = useState("");
  const [Lupetti, setLupetti] = useState([]);
  const [Operazioni, setOperazioni] = useState([]);
  const [Modificatori, setModificatori] = useState([]);
  const [filterdLupetti, setFilterdLupetti] = useState([]);
  const [filterdOperazioni, setFilterdOperazioni] = useState([]);
  const [filterdModificatori, setFilterdModificatori] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const lupetto = onSnapshot(collection(db, "Lupetti"), (querySnapshot) => {
      //prendo tutti i lupetti
      const lupetti = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setLupetti(lupetti);
    });
    const operazione = onSnapshot(
      collection(db, "Operazione"),
      (querySnapshot) => {
        //prendo tutte le operazioni
        const operazioni = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOperazioni(operazioni);
      }
    );

    const modificatore = onSnapshot(
      collection(db, "Modificatori"),
      (querySnapshot) => {
        //prendo tutti i modificatori
        const modificatori = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setModificatori(modificatori);
      }
    );

    return () => {
      lupetto();
      modificatore();
      operazione();
    };
  }, [db]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = () => {
    const lupetti = Lupetti.filter(
      (lupetto) => lupetto.Cognome === Cognome && lupetto.Nome === Nome
    );
    setFilterdLupetti(lupetti);
    const operazioni = Operazioni.filter(
      (operazioni) => operazioni.idLup === lupetti[0].id
    );
    setFilterdOperazioni(operazioni);
    
    const modificatori = filterdOperazioni.map((operazione) =>
      Modificatori.filter((modificatore) => modificatore.id == operazione.idMod)
    );
    setFilterdModificatori(modificatori);
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
                    Aggiunta Modificatore
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
      <div>
        <div>
          <label>
            Cognome:
            <input
              type="text"
              id="cognome"
              onChange={(e) => setCognome(e.target.value)}
            />
          </label>
          <label>
            Nome:
            <input
              type="text"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <button onClick={handleSubmit}>Cerca</button>
        </div>
        <br></br>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-center">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipo Modificatore
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Punteggio Modificatore
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Note Operazione
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterdOperazioni && filterdModificatori && filterdOperazioni.length > 0 && filterdModificatori.length > 0 ? (
              filterdOperazioni
                .reduce((acc, operazione) => {
                  console.log(filterdModificatori);
                  const modificatori = filterdModificatori.filter(
                    (modificatore) => modificatore.id === operazione.idMod
                  );

                  modificatori.forEach((modificatore) => {
                    acc.push({
                      Data: operazione.Data,
                      Tipo: modificatore.Tipo,
                      Punteggio: modificatore.Punteggio,
                      Note: operazione.Note,
                    });
                  });
                  return acc;
                  
                }, [])
                .map((riga, index) => (
                  <tr key={index}>
                    <td>{riga.Data}</td>
                    <td>{riga.Tipo}</td>
                    <td>{riga.Punteggio}</td>
                    <td>{riga.Note}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Nessun risultato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );  
}

export default RicercaLupetto;


{/*{filterdOperazioni
  .reduce((acc, operazione) => {
    
    const modificatori = filterdModificatori.filter(
      (modificatore) => modificatore.id === operazione.idMod
    );
    modificatori.forEach((modificatore) => {
      acc.push({
        Data: operazione.Data,
        Tipo: modificatore.Tipo,
        Punteggio: modificatore.Punteggio,
        Note: operazione.Note,
      });
    });
    return acc;
  }, [])
  .map((riga, index) => (
    <tr key={index}>
      <td>{riga.Data}</td>
      <td>{riga.Tipo}</td>
      <td>{riga.Punteggio}</td>
      <td>{riga.Note}</td>
    </tr>
  ))*/}

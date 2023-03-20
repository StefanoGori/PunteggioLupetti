import {
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

import Scout from "./components/Scout";
import InserimentoLupetto from "./components/InserimentoLupetto";
import CancellaLupetto from "./components/CancellaLupetto";
import ModificaPunteggio from "./components/ModificaPunteggio";
import InserimentoModificatore from "./components/InserimentoModificatore";
import RicercaLupetto from "./components/RicercaLupetto";
import ModificaPunteggioLupetto from "./components/ModificaPunteggioLupetto";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Scout/>} />
          <Route path="/inserimento-lupetto" element={<InserimentoLupetto/>} />
          <Route path="/cancella-lupetto" element={<CancellaLupetto/>} />
          <Route path="/modifica-punteggio" element={<ModificaPunteggio/>} />
          <Route path="/inserimento-modificatore" element={<InserimentoModificatore/>} />
          <Route path="/ricerca-lupetto" element={<RicercaLupetto/>} />
          <Route path="/scout" element={<Scout/>} />
          <Route path="/modifica-lupetto" element={<ModificaPunteggioLupetto/>}/>
      </Routes>
    </div>
  );
}

export default App;

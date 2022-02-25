import Inicio from "./Inicio/Inicio";
import { Route, Routes } from "react-router-dom";
import Game from "./Game/Game";
import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;

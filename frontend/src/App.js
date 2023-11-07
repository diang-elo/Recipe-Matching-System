import "./App.css";
import Landing from "./screens/Landing";
import Recipes from "./screens/Recipes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipe/:term" element={<Recipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

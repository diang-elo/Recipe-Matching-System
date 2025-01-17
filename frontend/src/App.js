import "./App.css";
import Info from "./screens/Info";
import Landing from "./screens/Landing";
import Recipes from "./screens/Recipes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodaysRecipe from "./screens/TodaysRecipe";
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">
            {" "}
            <div className="cursor-pointer">Home</div>
          </Link>
          <Link to="/todays-recipe">
            <div className="cursor-pointer">Today's Recipe</div>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipe/:term" element={<Recipes />} />
          <Route path="/info/:term" element={<Info />} />
          <Route path="/todays-recipe" element={<TodaysRecipe />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

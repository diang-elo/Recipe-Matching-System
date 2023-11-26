import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function TodaysRecipe() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/info/25");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <PacmanLoader color="#36d7b7" />
    </div>
  );
}
export default TodaysRecipe;

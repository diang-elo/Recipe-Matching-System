import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function TodaysRecipe() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/info/25");
  }, []);

  return (
    <div class="flex flex-col items-center justify-center h-screen">
  <div class="mb-4">
    <PacmanLoader color="#36d7b7" />
  </div>
  <p class="text-center text-[#36d7b7] font-bold">(First search may take up to 2 minutes to load. Backend hosted on free service and needs to wake up.)</p>
</div>
  );
}
export default TodaysRecipe;

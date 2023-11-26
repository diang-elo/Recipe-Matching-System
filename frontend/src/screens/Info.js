import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function Info() {
  const [searchRecipe, setSearchedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();

  const getSearch = (e) => {
    axios
      .get(
        "https://recipe-backend-2op5.onrender.com/recipes/byId?id=" +
          params.term
      )
      .then(function (response) {
        console.log(response);
        setSearchedRecipe(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getSearch(params.term);
  }, [params.term]);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <PacmanLoader color="#36d7b7" />
    </div>
  ) : !searchRecipe ? (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl">Error Finding Recipe</div>
    </div>
  ) : (
    <>
      <div className=" text-lime-800 py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold cursive-font">
            {searchRecipe.name}
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
        {/* Recipe Image */}

        <img
          src={searchRecipe.img}
          alt="Recipe"
          className="w-full h-64 object-contain rounded-full mb-6"
        />

        {/* Recipe Description */}
        <div className="mb-6 ">
          <h2 className="text-2xl font-bold text-lime-800">
            Recipe Description
          </h2>
          <p className="text-gray-600">{searchRecipe.desc}</p>
        </div>
        {/* Recipe prep time */}
        <div className="mb-6 ">
          <h2 className="text-2xl font-bold text-lime-800">Preparation Time</h2>
          <p className="text-gray-600">
            {searchRecipe.preperationTime} minutes
          </p>
        </div>
        {/* Recipe Ingredients */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-lime-800">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-600">
            {Object.values(searchRecipe.ingredients).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
        {/* Recipe Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-lime-800">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-600">
            {searchRecipe.preperationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Info;

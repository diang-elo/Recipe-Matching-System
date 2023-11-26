import React from "react";
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";
import PacmanLoader from "react-spinners/PacmanLoader";

function Recipes() {
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();
  let [key, value] = params.term.split("=");

  let endpoint = "";
  let request = "";
  if (key === "byIngredient") {
    endpoint = "http://localhost:3000/recipes/byIngredients";
    request = "post";
    value = value.split(",").map(Number);
    value = { ingredientIds: value };
  } else if (key === "byDiet") {
    request = "get";
    endpoint = "http://localhost:3000/recipes/byDiet?diet=" + value;
  } else if (key === "byName") {
    request = "get";
    endpoint = "http://localhost:3000/recipes/byName?name=" + value;
  }

  const getSearch = (e) => {
    if (request === "post") {
      axios
        .post(endpoint, value)
        .then(function (response) {
          console.log(response);
          setSearchedRecipe(response.data.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else if (request === "get") {
      axios
        .get(endpoint)
        .then(function (response) {
          console.log(response);
          setSearchedRecipe(response.data.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getSearch(params.term);
  }, [params.term]);

  console.log(searchedRecipe.length);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <PacmanLoader color="##EFFDF4" />
    </div>
  ) : searchedRecipe.length === 0 ? (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl">Does not exist</div>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {searchedRecipe.map((item) => (
        <div key={item.id}>
          {/* ToDo: Design card template for each recipe */}
          <RecipeCard
            title={item.name}
            subTitle={item.desc}
            img={item.img}
            recipeID={item.id}
          />
        </div>
      ))}
    </div>
  );
}

export default Recipes;

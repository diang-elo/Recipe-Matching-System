import React from "react";
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";

function Recipes() {
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  let params = useParams();

  const getSearch = (e) => {
    axios
      .get("http://localhost:3000/recipe/" + params.term)
      .then(function (response) {
        console.log(response);
        setSearchedRecipe(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getSearch(params.term);
  }, [params.term]);

  return (
    <div class="">
      {searchedRecipe.map((item) => {
        return (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
            {/* ToDo: Design card template for each recipe  */}
          </div>
        );
      })}
    </div>
  );
}

export default Recipes;

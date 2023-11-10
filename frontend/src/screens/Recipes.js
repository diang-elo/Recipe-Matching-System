import React from "react";
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div class="bg-red-100">
      {searchedRecipe.map((item) => {
        return (
          <div class="grid grid-cols-4">
            {/* ToDo: Design card template for each recipe  */}
          </div>
        );
      })}
    </div>
  );
}

export default Recipes;

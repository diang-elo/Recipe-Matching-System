import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";

function Landing() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("ingredients");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  const getSearch = async () => {
    try {
      const response = await axios.get(
        `https://recipe-backend-2op5.onrender.com/ingredients/search?name=${searchName}`,
        { timeout: 5000 }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRecipe = (e) => {
    e.preventDefault();

    if (searchType === "ingredients") {
      navigate("/recipe/" + "byIngredient=" + selectedIngredientIds);
    } else if (searchType === "diet") {
      navigate("/recipe/" + "byDiet=" + searchName);
    } else if (searchType === "recipe") {
      navigate("/recipe/" + "byName=" + searchName);
    }
  };

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchResults([]); // Clear the search results after selecting an ingredient
    setSearchName(""); // Clear the input field
    document.getElementById("default-search").value = "";
    // Make sure to fetch the ingredient ID from the API or use the appropriate identifier
    console.log(ingredient);
    const ingredientId = getIngredientIdFromName(ingredient); // Replace with the actual API call or logic

    setSelectedIngredientIds([...selectedIngredientIds, ingredientId]);
  };

  const handleRemoveIngredient = (index, event) => {
    event.preventDefault();
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(index, 1);
    setSelectedIngredients(updatedIngredients);

    const updatedIngredientIds = [...selectedIngredientIds];
    updatedIngredientIds.splice(index, 1);
    setSelectedIngredientIds(updatedIngredientIds);
  };

  const getIngredientIdFromName = (ingredient) => {
    const foundIngredient = searchResults.find(
      (result) => result.name === ingredient
    );
    return foundIngredient ? foundIngredient.id : null;
  };

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 cursive-font">
          Recipe Finder
        </h1>
        <form className="sm:w-3/5 w-80 relative">
          <label
            htmlFor="search-type"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="flex">
            <select
              id="search-type"
              onChange={(event) => {
                setSearchType(event.target.value);
              }}
              className="block p-4 pr-8 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500"
            >
              <option value="ingredients">Search by Ingredients</option>
              <option value="diet">Search by Diet</option>
              <option value="recipe">Search by Recipe</option>
            </select>
            <input
              onChange={(event) => {
                setSearchName(event.target.value);
                if (searchType === "ingredients") {
                  getSearch();
                }
              }}
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500"
              placeholder="Search Ingredient"
            />
            <button
              onClick={getRecipe}
              type="submit"
              className="text-white bg-lime-800 hover:bg-lime-900 focus:ring-4 focus:outline-none focus:ring-lime-900 font-medium rounded-r-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
          {/* Display the search results as a menu */}
          {searchResults.length > 0 && searchName && (
            <ul className="absolute z-10 mt-2 bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg w-full">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectIngredient(result.name)}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
          {/* Display selected ingredients */}
          <div className="mt-2">
            {selectedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 relative"
              >
                {ingredient}
                <button
                  className="absolute right-0 top-0 text-red-600 cursor-pointer"
                  onClick={(event) => handleRemoveIngredient(index, event)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </form>

        <div class="flex justify-center">
          <RecipeCard
            title="Mocha Latte"
            img="https://athome.starbucks.com/sites/default/files/styles/homepage_banner_xlarge/public/2021-06/CaffeMocha_Header.jpg.webp?itok=O9FqK5Y_"
          />
          <RecipeCard
            title="Mocha Latte"
            img="https://athome.starbucks.com/sites/default/files/styles/homepage_banner_xlarge/public/2021-06/CaffeMocha_Header.jpg.webp?itok=O9FqK5Y_"
          />
          <RecipeCard
            title="Mocha Latte"
            img="https://athome.starbucks.com/sites/default/files/styles/homepage_banner_xlarge/public/2021-06/CaffeMocha_Header.jpg.webp?itok=O9FqK5Y_"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;

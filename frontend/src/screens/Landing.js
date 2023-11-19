import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";
function Landing() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const getSearch = (e) => {
    e.preventDefault();
    navigate("/recipe/" + searchName);
  };

  return (
    <div>
      <div class="grid place-items-center h-screen">
        <h1 class="mb-4 text-6xl font-bold text-gray-900 cursive-font">
          Recipe Finder
        </h1>
        <form class="sm:w-3/5 w-80">
          <label
            for="search-type"
            class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div class="relative flex">
            <select
              id="search-type"
              onChange={(event) => {
                setSearchType(event.target.value);
              }}
              class="block p-4 pr-8 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500"
            >
              <option value="ingredients">Search by Ingredients</option>
              <option value="diet">Search by Diet</option>
              <option value="recipe">Search by Recipe</option>
            </select>
            <input
              onChange={(event) => {
                setSearchName(event.target.value);
              }}
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500"
              placeholder="Search Ingredient"
            />
            <button
              onClick={getSearch}
              type="submit"
              class="text-white bg-lime-800 hover:bg-lime-900 focus:ring-4 focus:outline-none focus:ring-lime-900 font-medium rounded-r-lg text-sm px-4 py-2"
            >
              Search
            </button>
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

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";
function Landing() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const getSearch = (e) => {
    e.preventDefault();
    navigate("/recipe/" + searchName);
  };

  return (
    <div>
      <div class="grid place-items-center h-screen">
        <h1 class="mb-4 text-4xl font-bold text-gray-900">Recipe Finder</h1>
        <form class="sm:w-3/5 w-80">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              onChange={(event) => {
                setSearchName(event.target.value);
              }}
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 "
              placeholder="Search Ingredient"
            />
            <button
              onClick={getSearch}
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-lime-800 hover:bg-lime-900 focus:ring-4 focus:outline-none focus:ring-lime-900 font-medium rounded-lg text-sm px-4 py-2"
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

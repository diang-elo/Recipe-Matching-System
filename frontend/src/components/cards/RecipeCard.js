import React from "react";

function RecipeCard({ title, subTitle, img }) {
  return (
    <div class="max-w-[22rem] bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 mx-2 my-8">
      <img
        class="w-full h-[16rem] object-cover rounded-t-2xl"
        src={img}
        alt={title}
      />
      <div class="bg-green-50 p-4">
        <h2 class="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p class="text-gray-600">{subTitle}</p>
        <div class="flex justify-start mt-4">
          <button class="bg-lime-800  text-white px-4 py-2 rounded hover:bg-lime-900 transition-colors">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

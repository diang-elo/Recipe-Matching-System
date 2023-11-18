import React from "react";

function Info() {
  return (
    <>
      <div className=" text-lime-800 py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold cursive-font">
            Caramel Mocha Recipe
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
        {/* Recipe Image */}

        <img
          src="https://athome.starbucks.com/sites/default/files/styles/homepage_banner_xlarge/public/2021-06/CaffeMocha_Header.jpg.webp?itok=O9FqK5Y_"
          alt="Recipe"
          className="w-full h-64 object-contain rounded-full mb-6"
        />

        {/* Recipe Description */}
        <div className="mb-6 ">
          <h2 className="text-2xl font-bold text-lime-800">
            Recipe Description
          </h2>
          <p className="text-gray-600">Recipe description</p>
        </div>
        {/* Recipe Ingredients */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-lime-800">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
            {/* Add more ingredients as needed */}
          </ul>
        </div>
        {/* Recipe Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-lime-800">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-600">
            <li>Step 1: Instruction 1</li>
            <li>Step 2: Instruction 2</li>
            <li>Step 3: Instruction 3</li>
            {/* Add more instructions as needed */}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Info;

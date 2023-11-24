import { MongoClient, ObjectId } from "mongodb";

export default class DrinkRecipe {
  constructor(
    public name: string,
    public ingredients: string[],
    public preparationSteps: string[],
    public preparationTime: number, // in minutes
    public drinkType: string, // e.g., Latte, Frappuccino
    public _id?: ObjectId
  ) {}
}

// Dummy recipes
const caramelMacchiato: DrinkRecipe = {
  name: "Caramel Macchiato",
  ingredients: [
    "1 cup of milk",
    "2 shots of espresso",
    "1 tablespoon vanilla syrup",
    "Caramel sauce for drizzling",
  ],
  preparationSteps: [
    "Steam the milk until it's hot and frothy.",
    "Brew the espresso shots.",
    "In a cup, mix the vanilla syrup with the steamed milk.",
    "Pour the espresso shots gently over the milk.",
    "Drizzle caramel sauce on top.",
  ],
  preparationTime: 10,
  drinkType: "Macchiato",
};

const pumpkinSpiceLatte: DrinkRecipe = {
  name: "Pumpkin Spice Latte",
  ingredients: [
    "1 cup of milk",
    "2 shots of espresso",
    "2 tablespoons pumpkin spice syrup",
    "Whipped cream",
    "Pumpkin pie spice for garnish",
  ],
  preparationSteps: [
    "Steam milk until hot and frothy.",
    "Brew the espresso shots.",
    "In a cup, combine the espresso with the pumpkin spice syrup.",
    "Pour in the steamed milk and stir well.",
    "Top with whipped cream and sprinkle with pumpkin pie spice.",
  ],
  preparationTime: 10,
  drinkType: "Latte",
};

const mochaFrappuccino: DrinkRecipe = {
  name: "Mocha Frappuccino",
  ingredients: [
    "1 cup of ice",
    "1/2 cup of milk",
    "2 shots of espresso",
    "2 tablespoons chocolate syrup",
    "Whipped cream",
  ],
  preparationSteps: [
    "Combine ice, milk, espresso, and chocolate syrup in a blender.",
    "Blend until smooth and frothy.",
    "Pour into a tall glass.",
    "Top with whipped cream.",
  ],
  preparationTime: 5,
  drinkType: "Frappuccino",
};

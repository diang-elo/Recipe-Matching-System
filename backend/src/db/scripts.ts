import { Ingredient } from "../ingredients"
import db from './index' //import initialized Mongodb object from index file

export async function getIngredients(): Promise<Ingredient[]> {
    const collection = await db.collection("posts");
  const results = await collection.find({}).toArray() as Ingredient[] //type casting may not be needed
    return results
}

export async function addIngredient(ingredient: Ingredient): Promise<Ingredient[]>  {
    return []
}
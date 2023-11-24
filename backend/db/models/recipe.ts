import { ObjectId } from "mongodb";

export default class Recipe {
  constructor(
    public name: string,
    public ingredients: string[],
    public preparationSteps: string[],
    public preparationTime: number, // in minutes
    public _id?: ObjectId
  ) {}
}

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../conn";
import Recipe from "../models/recipe";

export const router = express.Router();

router.use(express.json());

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecipe = req.body as Recipe;
    if (!collections.recipes) {
      throw new Error("Collection not found");
    }
    const result = await collections.recipes.insertOne(newRecipe);

    result
      ? res
          .status(201)
          .send(
            `Successfully created a new recipe with id ${result.insertedId}`
          )
      : res.status(500).send("Failed to create a new recipe.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(400).send(error.message);
    } else {
      console.error(error);
      res.status(400).send("An unknown error occurred");
    }
  }
});

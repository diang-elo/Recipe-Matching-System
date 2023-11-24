import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../conn";
import Recipe from "../models/recipe";

export const router = express.Router();

router.use(express.json());

router.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const recipe = (await collections.recipes?.findOne(query)) as Recipe;

    if (recipe) {
      res.status(200).send(recipe);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

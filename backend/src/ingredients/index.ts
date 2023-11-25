import express, { Request, Response } from 'express';
import { Db, Collection } from 'mongodb';

const ingredientRouter = express.Router();

// Define a route to get all ingredients
ingredientRouter.get('/', async (req: Request, res: Response) => {
  try {
    // Assuming you already have a reference to the MongoDB database (db) from the main app file
    const db: Db = req.app.get('db');

    // Assuming your ingredients collection is named 'ingredients'
    const ingredientsCollection: Collection = db.collection('ingredients');

    // Fetch all documents from the ingredients collection
    const ingredients = await ingredientsCollection.find({}).toArray();

    // Send the fetched ingredients as a JSON response
    res.json(ingredients);
  } catch (error) {
    // Handle errors, log them, and send an appropriate response
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default ingredientRouter;

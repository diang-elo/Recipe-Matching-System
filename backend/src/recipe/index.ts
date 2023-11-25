import express, { Request, Response } from 'express';
import { Db, ObjectId  } from 'mongodb';

const sessionRouter = express.Router();

sessionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db: Db = req.app.get('db');
    const recipesCollection = db.collection('recipes');

    const recipes = await recipesCollection.find({}).toArray();

    res.status(200).json({
      status: 'success',
      data: recipes,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

sessionRouter.post('/byIngredients', async (req: Request, res: Response) => {
    try {
      const db: Db = req.app.get('db');
      const recipesCollection = db.collection('recipes');
  
      // Ensure the request body contains an array of ingredient IDs
      const ingredientIds = req.body.ingredientIds;
      if (!Array.isArray(ingredientIds)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid input. Expected an array of ingredient IDs.',
        });
      }
  
      // Construct the query to match recipes that have keys in the "ingredients" object matching any of the specified ingredient IDs
      const query = {
        $or: ingredientIds.map((id) => ({ [`ingredients.${id}`]: { $exists: true } })),
      };
  
      // Find recipes based on the constructed query
      const recipes = await recipesCollection.find(query).toArray();
  
      res.status(200).json({
        status: 'success',
        data: recipes,
      });
    } catch (error) {
      console.error('Error fetching recipes by ingredients:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

  sessionRouter.get('/byId', async (req: Request, res: Response) => {
    try {
      const db: Db = req.app.get('db');
      const recipesCollection = db.collection('recipes');
  
      // Extract the recipe ID from the query parameters
      const recipeId = req.query.id;
  
      // Validate that a valid ID is provided
      if (!recipeId || typeof recipeId !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid input. Recipe ID is required.',
        });
      }
  
      // Find the recipe by the "id" field
      const recipe = await recipesCollection.findOne({
        'id': parseInt(recipeId), // Assuming "id" is stored as a number
      });
  
      // Check if the recipe is found
      if (!recipe) {
        return res.status(404).json({
          status: 'error',
          message: 'Recipe not found.',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: recipe,
      });
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

  sessionRouter.get('/byDiet', async (req: Request, res: Response) => {
    try {
      const db: Db = req.app.get('db');
      const recipesCollection = db.collection('recipes');
  
      // Extract the diet from the query parameters
      const diet = req.query.diet;
  
      // Validate that a valid diet is provided
      if (!diet || typeof diet !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid input. Diet is required.',
        });
      }
  
      // Find recipes by diet
      const recipes = await recipesCollection.find({
        'diet': diet.toLowerCase(), 
      }).toArray();
  
      res.status(200).json({
        status: 'success',
        data: recipes,
      });
    } catch (error) {
      console.error('Error fetching recipes by diet:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

  sessionRouter.get('/byName', async (req: Request, res: Response) => {
    try {
      const db: Db = req.app.get('db');
      const recipesCollection = db.collection('recipes');
  
      // Extract the name from the query parameters
      const name = req.query.name;
  
      // Validate that a valid name is provided
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid input. Name is required.',
        });
      }
  
      // Find recipes by name (case-insensitive and partial match)
      const recipes = await recipesCollection.find({
        'name': { $regex: new RegExp(name, 'i') },
      }).toArray();
  
      res.status(200).json({
        status: 'success',
        data: recipes,
      });
    } catch (error) {
      console.error('Error fetching recipes by name:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

export default sessionRouter;

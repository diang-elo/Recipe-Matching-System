import express, { Request, Response } from 'express';
import { Db, Collection, } from 'mongodb';

const ingredientRouter = express.Router();

//  get all ingredients
ingredientRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db: Db = req.app.get('db');

    const ingredientsCollection: Collection = db.collection('ingredients');

    // Fetch all documents from the ingredients collection
    const ingredients = await ingredientsCollection.find({}).toArray();

    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

ingredientRouter.get('/search', async (req: Request, res: Response) => {
    try {
      const db: Db = req.app.get('db');
      const ingredientsCollection: Collection = db.collection('ingredients');
      const nameQuery = req.query.name;
  
      const query = nameQuery ? { name: new RegExp(nameQuery as string, 'i') } : {};
  
      const ingredients = await ingredientsCollection.find(query).toArray();
  
      res.json(ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



export default ingredientRouter;

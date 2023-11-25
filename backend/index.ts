import express, { NextFunction, Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import ingredientRouter from './src/ingredients/index'; 
import sessionRouter from './src/recipe/index';

const app = express();
const cors = require('cors');
const PORT = 3000;

export class ValidationError extends Error {}
export class NotFoundError extends Error {};

// MongoDB connection URL
const mongoUrl = "mongodb+srv://eokereke:pT7UgWnHWkP8Uo3t@cluster0.e8xv6gg.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
MongoClient.connect(mongoUrl)
  .then((client: MongoClient) => {
    const db: Db = client.db('sample_Recipes');
  
    // Attach the db instance to the app
    app.set('db', db);

    console.log('Connected to MongoDB');
  
    // Set up routes 
    app.use(cors());
    app.use(express.json());
    app.use('/ingredients', ingredientRouter);
    app.use('/recipes', sessionRouter);
  
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  
    // Close MongoDB connection when the server is closed
    process.on('SIGINT', () => {
      client.close();
      process.exit();
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  let errorTitle = 'Internal Server Error';
  let errorMessage = 'The server could not complete your request';

  if (err instanceof ValidationError) {
    status = 400;
    errorTitle = 'Invalid Input';
    errorMessage = err.message;
  } else if (err instanceof NotFoundError) {
    status = 404;
    errorTitle = 'Resource not found';
    errorMessage = err.message;
  }

  console.log(`Error ${err.message}, at: ${req.path}`);

  return res.status(status).json({
    status: errorTitle,
    message: errorMessage,
    path: req.path,
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to coe714 recipe-matching-project');
});

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { recipes?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const dbstr: string =
    process.env.DB_CONN_STRING ??
    "mongodb+srv://eokereke:pT7UgWnHWkP8Uo3t@cluster0.e8xv6gg.mongodb.net/?retryWrites=true&w=majority";
  const collect: string = process.env.COLLECTION_NAME ?? "Cluster0";
  const dbname: string = process.env.DB_NAME ?? "recipes";

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbstr);

  await client.connect();

  const db: mongoDB.Db = client.db(dbname);

  const recipesCollection: mongoDB.Collection = db.collection(collect);

  collections.recipes = recipesCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${recipesCollection.collectionName}`
  );
}

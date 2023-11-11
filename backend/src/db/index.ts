/**Initialize db, will be used in scripts file */
//import { MongoClient } from "mongodb";
//Class only for display purposes. Delete it once mongo db is isntalled

const connectionString = process.env.ATLAS_URI || "";
//const client = new MongoClient(connectionString); 
let conn;
try {
//  conn = await client.connect();
} catch(e) {
  console.error(e);
}
//let db = conn.db("sample_training");
const db = {}
export default db;
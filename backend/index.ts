import express from "express";
import ingredientRouter from "./src/ingredients/index";
import sessionRouter from "./src/sessions/index";
import { connectToDatabase } from "./db/conn";
import { router } from "./db/routes/posts";

const app = express();
const PORT = 3000;

connectToDatabase()
  .then(() => {
    app.use("/recipes", router);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

app.use(express.json());
app.use("/ingredients", ingredientRouter);
app.use("/sessions", sessionRouter);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("welcome to coe714 recipe-matching-project");
});

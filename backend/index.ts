import express from 'express'
import ingredientRouter from './src/ingredients/index'
import sessionRouter from './src/sessions/index'
const app = express()
const PORT = 3000

app.use(express.json());
app.use('/ingredients', ingredientRouter)
app.use('/sessions', sessionRouter)

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})

app.get('/', (req, res)=>{
    res.send("welcome to coe714 recipe-matching-project")
})
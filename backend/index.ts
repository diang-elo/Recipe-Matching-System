import express, { NextFunction, Request, Response } from 'express'
import ingredientRouter from './src/ingredients/index'
import sessionRouter from './src/recipe/index'
const app = express()
const PORT = 3000
export class ValidationError extends Error {}
export class NotFoundError extends Error {}

app.use(express.json());
app.use('/ingredients', ingredientRouter)
app.use('/recipes', sessionRouter)

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { 
    let status = 500
    let errorTitle = 'Internal Server Error'
    let errorMessage = 'The server could not complete your request'

    if(err instanceof ValidationError) {
        status = 400;
        errorTitle = 'Invalid Input'
        errorMessage = err.message
    } else if(err instanceof NotFoundError) {
        status = 404
        errorTitle = 'Resource not found'
        errorMessage = err.message
    }

    console.log(`Error ${err.message}, at: ${req.path}`)

    return res.status(status).json({
      status: errorTitle,
      message: errorMessage,
      path: req.path
    });
}); 

app.get('/', (req, res)=>{
    res.send("welcome to coe714 recipe-matching-project")
})

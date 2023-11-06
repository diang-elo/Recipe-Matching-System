import express, {Request, Response} from 'express'
const router = express.Router()
import { Ingredient } from '../ingredients'
import { randomUUID } from 'crypto';

type Session = {
    id: string;
    dateCreated: string;
    ingredients: Ingredient[]
}

type Recipe = {
    id: number;
    name: string;
    ingredients: Ingredient[];
    directions: {
        indx: number;
        text: string
    }[];
    cookTime: string;
}

const sessions: Session[] = []

router.post('/', (req: Request, res: Response)=>{
    const newID = randomUUID()
    const newSession: Session = {
        id: newID,
        dateCreated: Date.now().toLocaleString(),
        ingredients: []
    }
    sessions.push(newSession)
    res.send(newSession)
})

router.get('/:sessionID', (req: Request, res: Response)=>{
    res.send(sessions.find(sesh=> sesh.id === req.params.sessionID))
})

router.post('/:sessionID/ingredient', (req: Request, res: Response)=>{
    const session = sessions.find(sesh=> sesh.id === req.params.sessionID)
    session?.ingredients.push(req.body)
    res.send(session)
})

router.delete('/:sessionID/ingredient', (req: Request, res: Response)=>{
    const session = sessions.find(sesh=> sesh.id === req.params.sessionID)
    session?.ingredients.filter(ing=> ing.id != req.body.id)
    res.send(session)
})

router.post('/:sessionID/generateRecipe', (req:Request, res: Response) =>{
    const session = sessions.find(sesh=> sesh.id === req.params.sessionID)
    const recipe: Recipe = {
        id: 0,
        name: 'The ultimate Test recipe',
        ingredients: session?.ingredients ?? [],
        directions: [{indx:0, text: 'First boil water'}, {indx: 1, text:'Then pass CPS714'}],
        cookTime: '1 hr.'
    }
    res.send(recipe)
})

export default router
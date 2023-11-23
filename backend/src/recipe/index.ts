import express, {Request, Response} from 'express'
const router = express.Router()
import { Ingredient } from '../ingredients'

type Recipe = {
    id: number;
    name: string;
    image: string
    ingredients: Ingredient[];
    directions: {
        indx: number;
        text: string
    }[];
    cookTime: string;
}

router.post('/', (req: Request, res: Response)=>{
    const ingredients = req.body as Ingredient[]
    const recipe: Recipe = {
        id: 0,
        name: 'The ultimate Test recipe',
        image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        ingredients: ingredients ?? [],
        directions: [{indx:0, text: 'First boil water'}, {indx: 1, text:'Then pass CPS714'}],
        cookTime: '1 hr.'
    }
    res.send(recipe)
})

router.get('/', (req: Request, res: Response)=>{
    const searchText = (req.query.name ?? "") as string
    let results = [
        {
            id: 0,
            name: 'The ultimate Test recipe 1',
            image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ingredients: [],
            directions: [{indx:0, text: 'First boil water'}, {indx: 1, text:'Then pass CPS714'}],
            cookTime: '1 hr.'
        },
        {
            id: 0,
            name: 'The ultimate Test recipe 2',
            image: 'https://images.pexels.com/photos/4099123/pexels-photo-4099123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ingredients: [],
            directions: [{indx:0, text: 'First boil water'}, {indx: 1, text:'Then pass CPS714'}],
            cookTime: '1 hr.'
        },
        {
            id: 0,
            name: 'The ultimate Test recipe 3',
            image: 'https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ingredients: [],
            directions: [{indx:0, text: 'First boil water'}, {indx: 1, text:'Then pass CPS714'}],
            cookTime: '1 hr.'
        }
    ]

    if(searchText.length > 0) {
        results = results.filter(res=> res.name.includes(searchText))
    }
    res.send(results)
})

export default router
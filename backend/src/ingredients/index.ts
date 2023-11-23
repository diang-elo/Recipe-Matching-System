import express, {Request, Response} from 'express'
const router = express.Router()

export type Ingredient = {
    id: number;
    name: string;
    category: IngredientCategory
}

export type IngredientCategory = {
    id: number;
    name: string
}
const data: Ingredient[] = [
    {
        id: 0,
        name: 'Broccoli',
        category: {
            id: 0,
            name: "Vegetable"
        }
    },
    {
        id: 1,
        name: 'Banana',
        category: {
            id: 1,
            name: "Fruit"
        }
    },
    {
        id: 2,
        name: 'Broccoli Test',
        category: {
            id: 0,
            name: "Vegetable"
        }
    }
]

router.get(`/`, (req: Request,res: Response)=> {
    const nameSearchTerm = (req.query?.name ? req.query.name : "" )as string;
    const categorySearchTerm = (req.query?.category ? req.query.category : "" )as string;
    let results = data
    if(nameSearchTerm?.trim().length > 0) {
        results = results.filter(res=> res.name.includes(nameSearchTerm))
    }
    if(categorySearchTerm?.trim().length > 0) {
        results = results.filter(res=> res.category?.name.includes(categorySearchTerm))
    }
    res.send(results)
})

router.post(`/`, (req: Request,res: Response)=> {
    const newIngredient = req.body as Ingredient
    newIngredient.id = data[data.length -1].id + 1
    data.push(newIngredient)
    res.send(newIngredient)
})

router.get(`/:id`,  (req:Request,res: Response)=> {
    const id = req.params.id ? parseInt(req.params.id) : null
    res.send(data.find(ingredient=> ingredient.id === id))
})

router.put(`/:id`,  (req: Request,res: Response)=> {
    const ingredient = req.body as Ingredient
    data.map(oldIngredient=> 
        oldIngredient.id === ingredient.id ? ingredient : oldIngredient)
    res.send(ingredient)
})

router.delete(`/:id`,  (req: Request,res: Response)=> {
    const ingredient = req.body as Ingredient
    data.filter(oldIngredient=> oldIngredient.id === ingredient.id)
    res.send(data)
})

export default router
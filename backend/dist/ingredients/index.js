"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const data = [
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
        name: 'Broccoli',
        category: {
            id: 0,
            name: "Vegetable"
        }
    }
];
router.get(`/`, (req, res) => {
    res.send('sending data');
});
router.post(`/`, (req, res) => {
    const newIngredient = req.body;
    newIngredient.id = data[data.length - 1].id + 1;
    data.push(newIngredient);
    res.send(newIngredient);
});
router.get(`/:id`, (req, res) => {
    const id = req.params.id === null ? parseInt(req.params.id) : null;
    res.send(data.find(ingredient => ingredient.id === id));
});
router.put(`/:id`, (req, res) => {
    const ingredient = req.body;
    data.map(oldIngredient => oldIngredient.id === ingredient.id ? ingredient : oldIngredient);
    res.send(ingredient);
});
router.delete(`/:id`, (req, res) => {
    const ingredient = req.body;
    data.filter(oldIngredient => oldIngredient.id === ingredient.id);
    res.send(data);
});
module.exports = router;

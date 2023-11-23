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
        name: 'Broccoli Test',
        category: {
            id: 0,
            name: "Vegetable"
        }
    }
];
router.get(`/`, (req, res) => {
    var _a, _b;
    const nameSearchTerm = (((_a = req.query) === null || _a === void 0 ? void 0 : _a.name) ? req.query.name : "");
    const categorySearchTerm = (((_b = req.query) === null || _b === void 0 ? void 0 : _b.category) ? req.query.category : "");
    let results = data;
    if ((nameSearchTerm === null || nameSearchTerm === void 0 ? void 0 : nameSearchTerm.trim().length) > 0) {
        results = results.filter(res => res.name.includes(nameSearchTerm));
    }
    if ((categorySearchTerm === null || categorySearchTerm === void 0 ? void 0 : categorySearchTerm.trim().length) > 0) {
        results = results.filter(res => { var _a; return (_a = res.category) === null || _a === void 0 ? void 0 : _a.name.includes(categorySearchTerm); });
    }
    res.send(results);
});
router.post(`/`, (req, res) => {
    const newIngredient = req.body;
    newIngredient.id = data[data.length - 1].id + 1;
    data.push(newIngredient);
    res.send(newIngredient);
});
router.get(`/:id`, (req, res) => {
    const id = req.params.id ? parseInt(req.params.id) : null;
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
exports.default = router;

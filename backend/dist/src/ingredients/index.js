"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ingredientRouter = express_1.default.Router();
//  get all ingredients
ingredientRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = req.app.get('db');
        const ingredientsCollection = db.collection('ingredients');
        // Fetch all documents from the ingredients collection
        const ingredients = yield ingredientsCollection.find({}).toArray();
        res.json(ingredients);
    }
    catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
ingredientRouter.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = req.app.get('db');
        const ingredientsCollection = db.collection('ingredients');
        const nameQuery = req.query.name;
        const query = nameQuery ? { name: new RegExp(nameQuery, 'i') } : {};
        const ingredients = yield ingredientsCollection.find(query).toArray();
        res.json(ingredients);
    }
    catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = ingredientRouter;

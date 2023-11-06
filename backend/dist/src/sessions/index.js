"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const crypto_1 = require("crypto");
const sessions = [];
router.post('/', (req, res) => {
    const newID = (0, crypto_1.randomUUID)();
    const newSession = {
        id: newID,
        dateCreated: Date.now().toLocaleString(),
        ingredients: []
    };
    sessions.push(newSession);
    res.send(newSession);
});
router.get('/:sessionID', (req, res) => {
    res.send(sessions.find(sesh => sesh.id === req.params.sessionID));
});
router.post('/:sessionID/ingredient', (req, res) => {
    const session = sessions.find(sesh => sesh.id === req.params.sessionID);
    session === null || session === void 0 ? void 0 : session.ingredients.push(req.body);
    res.send(session);
});
router.delete('/:sessionID/ingredient', (req, res) => {
    const session = sessions.find(sesh => sesh.id === req.params.sessionID);
    session === null || session === void 0 ? void 0 : session.ingredients.filter(ing => ing.id != req.body.id);
    res.send(session);
});
router.post('/:sessionID/generateRecipe', (req, res) => {
    var _a;
    const session = sessions.find(sesh => sesh.id === req.params.sessionID);
    const recipe = {
        id: 0,
        name: 'The ultimate Test recipe',
        ingredients: (_a = session === null || session === void 0 ? void 0 : session.ingredients) !== null && _a !== void 0 ? _a : [],
        directions: [{ indx: 0, text: 'First boil water' }, { indx: 1, text: 'Then pass CPS714' }],
        cookTime: '1 hr.'
    };
    res.send(recipe);
});
exports.default = router;

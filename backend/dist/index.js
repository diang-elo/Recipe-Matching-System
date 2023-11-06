"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/ingredients/index"));
const index_2 = __importDefault(require("./src/sessions/index"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/ingredients', index_1.default);
app.use('/sessions', index_2.default);
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
app.get('/', (req, res) => {
    res.send("welcome to coe714 recipe-matching-project");
});

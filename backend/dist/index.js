"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ValidationError = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/ingredients/index"));
const index_2 = __importDefault(require("./src/sessions/index"));
const app = (0, express_1.default)();
const PORT = 3000;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
}
exports.NotFoundError = NotFoundError;
app.use(express_1.default.json());
app.use('/ingredients', index_1.default);
app.use('/sessions', index_2.default);
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
app.use((err, req, res, next) => {
    let status = 500;
    let errorTitle = 'Internal Server Error';
    let errorMessage = 'The server could not complete your request';
    if (err instanceof ValidationError) {
        status = 400;
        errorTitle = 'Invalid Input';
        errorMessage = err.message;
    }
    else if (err instanceof NotFoundError) {
        status = 404;
        errorTitle = 'Resource not found';
        errorMessage = err.message;
    }
    console.log(`Error ${err.message}, at: ${req.path}`);
    return res.status(status).json({
        status: errorTitle,
        message: errorMessage,
        path: req.path
    });
});
app.get('/', (req, res) => {
    res.send("welcome to coe714 recipe-matching-project");
});

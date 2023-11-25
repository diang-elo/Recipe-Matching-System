"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ValidationError = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const index_1 = __importDefault(require("./src/ingredients/index")); // Correcting the import path
const index_2 = __importDefault(require("./src/recipe/index"));
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 3000;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
}
exports.NotFoundError = NotFoundError;
;
// MongoDB connection URL
const mongoUrl = "mongodb+srv://eokereke:pT7UgWnHWkP8Uo3t@cluster0.e8xv6gg.mongodb.net/?retryWrites=true&w=majority";
// Connect to MongoDB
mongodb_1.MongoClient.connect(mongoUrl)
    .then((client) => {
    const db = client.db('sample_Recipes');
    // Attach the db instance to the app
    app.set('db', db);
    console.log('Connected to MongoDB');
    // Set up routes and start the server
    app.use(cors());
    app.use(express_1.default.json());
    app.use('/ingredients', index_1.default);
    app.use('/recipes', index_2.default);
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
    // Close MongoDB connection when the server is closed
    process.on('SIGINT', () => {
        client.close();
        process.exit();
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
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
        path: req.path,
    });
});
app.get('/', (req, res) => {
    res.send('Welcome to coe714 recipe-matching-project');
});

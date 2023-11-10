const schoolsrouter = require('express').Router();

const controller = require('../../controllers/v2/schools');
const authMiddleware = require('../..//data/middlewares/auth');

//use auth middleware
schoolsrouter.use(authMiddleware);

//students CRUD
schoolsrouter.get('/', controller.getAll); //read all
schoolsrouter.get('/:number', controller.getById); //read one by his id (schools number)
schoolsrouter.post('/create', controller.create); //create new schools
schoolsrouter.put('/update', controller.update); //update schools
schoolsrouter.delete('/delete/:number', controller.delete); //delete schools

module.exports = schoolsrouter;
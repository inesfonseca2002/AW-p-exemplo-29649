const coursesrouter = require('express').Router();
const controller = require('../../controllers/v1/courses');

//students CRUD
coursesrouter.get('/', controller.getAll); //read all
coursesrouter.get('/:number', controller.getById); //read one by his id (courses number)
coursesrouter.post('/create', controller.create); //create new courses
coursesrouter.put('/update', controller.update); //update courses
coursesrouter.delete('/delete/:number', controller.delete); //delete courses

module.exports = coursesrouter;
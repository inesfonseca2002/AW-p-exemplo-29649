const router = require('express').Router();
const studentRouter = require('./students');
const schoolsrouter = require('./schools');
const coursesrouter = require('./courses');

router.use('/students', studentRouter,);
router.use('/schools', schoolsrouter,);
router.use('/courses', coursesrouter,);

module.exports = router;
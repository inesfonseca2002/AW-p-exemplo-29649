const router = require('express').Router();
const studentRouter = require('./students');
const schoolsrouter = require('./schools');
const coursesrouter = require('./courses');
const authRouter = require('./auth');

router.use('/students', studentRouter,);
router.use('/schools', schoolsrouter,);
router.use('/courses', coursesrouter,);
router.use('/auth', authRouter);

module.exports = router;
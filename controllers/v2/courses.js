const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//return all courses
exports.getAll = async (req, res) => {
    try {
        //read all from database
        const response = await prisma.courses.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//return courses by his id (courses number)
exports.getById = async (req, res) => {
    //get courses id requested
    const id = req.params.number;
    try {
        //finds courses by his id (number)
        const response = await prisma.courses.findUnique({
            where: {
                number: id,
            },
        })
        //return courses
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//creates courses
exports.create = async (req, res) => {
    //get requested courses properties
    const { number, name, sigla, escola } = req.body;
    try {
        //creates new courses
        const courses = await prisma.courses.create({
            data: {
                number: number,
                name: name,
                sigla: sigla,
                escola: escola

            },
        })
        //return courses created
        res.status(201).json(courses)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//updates courses
exports.update = async (req, res) => {
    const { number, name, sigla, escola } = req.body;

    try {
        //find courses to update their data
        const courses = await prisma.courses.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                sigla: sigla,
                escola: escola
            },
        })
        //return courses updated
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//delete courses by his id (courses number)
exports.delete = async (req, res) => {
    //get courses number requested
    const number = req.params.number;
    try {
        //delete courses
        await prisma.courses.delete({
            where: {
                number: number,
            },
        })
        //just return ok
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//return all schools
exports.getAll = async (req, res) => {
    try {
        //read all from database
        const response = await prisma.schools.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//return schools by his id (schools number)
exports.getById = async (req, res) => {
    //get schools id requested
    const id = req.params.number;
    try {
        //finds schools by his id (number)
        const response = await prisma.schools.findUnique({
            where: {
                number: id,
            },
        })
        //return schools
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//creates schools
exports.create = async (req, res) => {
    //get requested schools properties
    const { number, name, sigla, morada,website } = req.body;
   
    try {
        //creates new schools
        const school = await prisma.schools.create({
            data: {
                
                number: number,
                name: name,
                sigla: sigla,
                morada: morada,
                website:website


            },
        })
        //return schools created
        res.status(201).json(school)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//updates schools
exports.update = async (req, res) => {
    const { number, name, sigla, morada,website } = req.body;

    try {
        //find schools to update their data
        const schools = await prisma.schools.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                sigla: sigla,
                morada: morada,
                website:website
            },
        })
        //return schools updated
        res.status(200).json(schools)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//delete schools by his id (schools number)
exports.delete = async (req, res) => {
    //get schools number requested
    const number = req.params.number;
    try {
        //delete schools
        await prisma.schools.delete({
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
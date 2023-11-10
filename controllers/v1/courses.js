const fs = require('fs');

//return all students
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //returns students array
    return res.send(data.students);
}

//return courses by his id (courses number)
exports.getById = async (req, res) => {
    //get courses id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //finds courses by his id
    var courses = data.students.filter(courses => courses.number == id);
    if (courses.length > 0) {
        //return courses
        return res.send(courses);
    }

    return res.status(200).send("O registo" + id + "nao existe");
}

//creates courses
exports.create = async (req, res) => {
    //get requested courses properties
    const { number, name, sigla, escola,website } = req.body;
    //valida os campos esra pechidos 
    if (number == null || name == null || sigla == null || escola == null ) {
        return res.status(200).send("existe campos por percher ");
    }



    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);

    const courses = data.students.filter(courses => courses.number == number);

    if (courses.length > 0) {
        return res.status(200).send("já existe um aluno com esse nº");
    }
    //add to students array
    data.students.push(req.body);
    //add to students array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new courses
    return res.status(201).send(req.body);
}

//updates courses
exports.update = async (req, res) => {
    const { number, name, sigla, escola } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find courses to update
    const courses = data.students.find(courses => courses.number == number);
    //update properties
    courses.name = name;
    courses.sigla = sigla;
    courses.escola = escola;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated courses
    return res.send({ number, name, sigla, escola });
}

//delete courses by his id (courses number)
exports.delete = async (req, res) => {
    //get courses id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find courses to delete

    var courses = data.students.filter(courses => courses.number == id);
    if (courses.length > 0) {

        //delete courses
        data.students.splice(courses, 1);
    }
    else {
        return res.status(200).send("O registo" + id + "nao existe");

    }
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}
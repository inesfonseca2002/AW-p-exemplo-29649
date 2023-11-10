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

//return student by his id (student number)
exports.getById = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //finds student by his id
    var student = data.students.filter(student => student.number == id);
    if (student.length > 0) {
        //return student
        return res.send(student);
    }

    return res.status(200).send("O registo" + id + "nao existe");
}

//creates student
exports.create = async (req, res) => {
    //get requested student properties
    const { number, name, city, birthday } = req.body;
    //valida os campos esra penchidos 
    if (number == null || name == null || city == null || birthday == null  ) {
        return res.status(400).send("existe campos por percher ");
    }



    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);

    const student = data.students.filter(student => student.number == number);

    if (student.length > 0) {
        return res.status(500).send("já existe um aluno com esse nº");
    }
    //add to students array
    data.students.push(req.body);
    //add to students array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new student
    return res.status(201).send(req.body);
}

//updates student
exports.update = async (req, res) => {
    const { number, name, city, birthday } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find student to update
    const student = data.students.find(student => student.number == number);
    //update properties
    student.name = name;
    student.city = city;
    student.birthday = birthday;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated student
    return res.send({ number, name, city, birthday });
}

//delete student by his id (student number)
exports.delete = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find student to delete

    var student = data.students.filter(student => student.number == id);
    if (student.length > 0) {

        //delete student
        data.students.splice(student, 1);
    }
    else {
        return res.status(200).send("O registo" + id + "nao existe");

    }
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}
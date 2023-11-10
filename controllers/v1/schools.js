const fs = require('fs');

//return all sckools
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //returns sckools array
    return res.send(data.sckools);
}

//return sckool by his id (sckool number)
exports.getById = async (req, res) => {
    //get sckool id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //finds sckool by his id
    var sckool = data.sckools.filter(sckool => sckool.number == id);
    if (sckool.length > 0) {
        //return sckool
        return res.send(sckool);
    }

    return res.status(200).send("O registo" + id + "nao existe");
}

//creates sckool
exports.create = async (req, res) => {
    //get requested sckool properties
    const { number, name, sigla, birthday } = req.body;
    //valida os campos esra pechidos 
    if (number == null || name == null || sigla == null || birthday == null) {
        return res.status(200).send("existe campos por percher ");
    }



    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);

    const sckool = data.sckools.filter(sckool => sckool.number == number);

    if (sckool.length > 0) {
        return res.status(200).send("já existe um aluno com esse nº");
    }
    //add to sckools array
    data.sckools.push(req.body);
    //add to sckools array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new sckool
    return res.status(201).send(req.body);
}

//updates sckool
exports.update = async (req, res) => {
    const { number, name, sigla, birthday } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find sckool to update
    const sckool = data.sckools.find(sckool => sckool.number == number);
    //update properties
    sckool.name = name;
    sckool.sigla = sigla;
    sckool.birthday = birthday;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated sckool
    return res.send({ number, name, sigla, birthday });
}

//delete sckool by his id (sckool number)
exports.delete = async (req, res) => {
    //get sckool id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find sckool to delete

    var sckool = data.sckools.filter(sckool => sckool.number == id);
    if (sckool.length > 0) {

        //delete sckool
        data.sckools.splice(sckool, 1);
    }
    else {
        return res.status(200).send("O registo" + id + "nao existe");

    }
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}
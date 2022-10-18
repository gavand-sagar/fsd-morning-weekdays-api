import { Router } from "express";
import fs from 'fs';
import { MongoClient } from 'mongodb'

const userRoutes = Router();

//get all
userRoutes.get('/users', (req, res) => {

    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return res.json(result)
        });
    });


})

//get single with id


userRoutes.delete('/users', (req, res) => {

    const username = req.query.username

    let fileContent = fs.readFileSync('./data/users.json');

    let usersList = JSON.parse(fileContent);

    //delete

    const index = usersList.indexOf(username)
    usersList.splice(index, 1)


    //write to file
    let newFileContent = JSON.stringify(usersList)
    fs.writeFileSync('./data/users.json', newFileContent)

    //res

    res.send('deleted')

})

//create user in system?
userRoutes.post('/users/:username/:password', (req, res) => {

    let user = {
        username: req.params.username,
        password: req.params.password
    }


    const result = user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)

    if (!result) {
        return res.json({
            status: false,
            message: 'Password must have --> Minimum eight characters, at least one letter, one number and one special character:'
        })
    }

    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);

        dbo.collection("users").insertOne(user, function (err, dbResult) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(dbResult);
            db.close();
            return res.json({
                status: true,
                message: 'Added successfully.'
            })
        });
    });

})



export default userRoutes;
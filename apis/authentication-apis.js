import e, { Router } from "express";
import fs from 'fs';
import { MongoClient } from 'mongodb'

const authenticationRoutes = Router();

authenticationRoutes.get('/authenticate/:username/:password', (req, res) => {

    let username = req.params.username
    let password = req.params.password

    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);

        dbo.collection("users").find({
            username: username,
            password: password
        }).toArray(function (err, result) {
            if (err) throw err;
            db.close();

            //to check if record present like this
            if (result && result.length > 0) {
                let responseObj = {
                    status: true,
                    username: result[0].username
                }
                return res.json(responseObj)
            } else {
                let responseObj = {
                    status: false
                }
                return res.json(responseObj)
            }


        });
    });


})


export default authenticationRoutes;
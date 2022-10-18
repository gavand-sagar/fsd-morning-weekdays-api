import e, { Router } from "express";
import fs from 'fs';

const authenticationRoutes = Router();

authenticationRoutes.get('/authenticate/:username/:password', (req, res) => {

    let username = req.params.username
    let password = req.params.password

    let fileContent = fs.readFileSync('./data/users.json');
    let data = JSON.parse(fileContent);

    let user = data.find(x => x.username.toLowerCase() == username.toLowerCase() && x.password == password)


    if (user) {
        let responseObj = {
            status: true,
            username: user.username
        }
        return res.json(responseObj)
    } else {
        let responseObj = {
            status: false
        }
        return res.json(responseObj)
    }
})


export default authenticationRoutes;
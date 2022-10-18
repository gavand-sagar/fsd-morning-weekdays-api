import { Router } from "express";
import fs from 'fs';

const userRoutes = Router();

//get all
userRoutes.get('/users', (req, res) => {

    let fileContent = fs.readFileSync('./data/users.json');
    let data = JSON.parse(fileContent);
    return res.json(data)

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
    
    //read from file to fetch prev data
    let fileContent = fs.readFileSync('./data/users.json');

    // convert to json
    let usersList = JSON.parse(fileContent);

    // push new item
    usersList.push(user)

    // convert back to string
    let newFileContent = JSON.stringify(usersList)

    //write to file 

    fs.writeFileSync('./data/users.json', newFileContent)

    res.json({
        status: true,
        message: 'Added successfully.'
    })
})



export default userRoutes;
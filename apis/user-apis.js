import { Router } from "express";
import fs from 'fs';
import { MongoClient, ObjectId } from 'mongodb'
import { getAllItemsFromCollection, saveItemInCollection, deleteItemFromCollection } from '../mongo-wrapper.js'
const userRoutes = Router();

//get all
userRoutes.get('/users', async (req, res) => {

    let users = await getAllItemsFromCollection('users')
    return res.json(users)

})

//get single with id


userRoutes.delete('/users', async (req, res) => {

    const username = req.query.username;

    const Id = req.params.id
    var matchQuery = { username: username };
    let result = await deleteItemFromCollection("posts", matchQuery)
    return res.json(result);


})

//create user in system?
userRoutes.post('/users/:username/:password', async (req, res) => {

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

    let dbResult = await saveItemInCollection("users", user)

    return res.json({
        status: true,
        message: 'Added Successfully.'
    })

})

export default userRoutes;
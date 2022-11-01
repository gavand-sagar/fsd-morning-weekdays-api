import { Router } from "express";
import fs from 'fs';
import { MongoClient, ObjectId } from 'mongodb'
import { getAllItemsFromCollection, saveItemInCollection, deleteItemFromCollection } from '../mongo-wrapper.js'
const questionsRoutes = Router();

//get all
questionsRoutes.get('/questions', async (req, res) => {

    let questions = await getAllItemsFromCollection('questions')
    return res.json(questions)

})

//create user in system?
questionsRoutes.post('/questions', async (req, res) => {

   saveItemInCollection("questions",req.body)


})

export default questionsRoutes;
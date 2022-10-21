import { Router } from "express";
import fs from 'fs';
import { generateUUID } from '../utilities/utility.js'
import { MongoClient, ObjectId } from 'mongodb'
import { ContainerNames } from '../db-constants.js'
import { deleteItemFromCollection, getAllItemsFromCollection, saveItemInCollection } from "../mongo-wrapper.js";
const postRoutes = Router()

postRoutes.post('/posts',async (req, res) => {
    let obj = {
        author: req.query.author,
        heading: req.query.heading,
        content: req.query.content,
        comments: [],
        likes: 0
    }
    let result = await saveItemInCollection("posts", obj)
    return res.json({ status: true, message: 'Added Successfully.' })

})

// get all post
postRoutes.get('/posts',async (req, res) => {
    let result = await getAllItemsFromCollection("posts");
    return res.json(result)
})

postRoutes.get('/posts/:id', (req, res) => {

    let id = req.params.id
    let fileContent = fs.readFileSync('./data/articles.json');
    let data = JSON.parse(fileContent);
    let singleItem = data.find(x => x.Id == id)
    return res.json(singleItem)

})

postRoutes.delete('/posts/:id', async (req, res) => {

    const Id = req.params.id
    var matchQuery = { _id: ObjectId(Id) };
    let result = await deleteItemFromCollection("posts", matchQuery)
    return res.json(result);

})

postRoutes.get('/posts/:id/like', (req, res) => {

    const Id = req.params.id

    //UPDATE
    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);
        dbo.collection(ContainerNames.Post).findOne({ _id: ObjectId(Id) }, function (err, result) {
            if (err) throw err;
            console.log("result", result);

            // after fetching record
            if (result) {
                let myquery = { _id: ObjectId(Id) }
                var newvalues = { $set: { likes: result.likes + 1 } };
                dbo.collection(ContainerNames.Post).updateOne(myquery, newvalues, function (err1, res) {
                    if (err1) throw err1;
                    console.log("1 document updated");
                    db.close();
                });
            } else {
                db.close();
            }

            res.json({
                status: true,
                data: []
            })
        });


    });



})





postRoutes.get('/posts/:id/dislike', (req, res) => {

    const Id = req.params.id

    //UPDATE
    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);
        dbo.collection(ContainerNames.Post).findOne({ _id: ObjectId(Id) }, function (err, result) {
            if (err) throw err;
            console.log("result", result);

            // after fetching record
            if (result) {
                let myquery = { _id: ObjectId(Id) }
                var newvalues = { $set: { likes: result.likes - 1 } };
                dbo.collection(ContainerNames.Post).updateOne(myquery, newvalues, function (err1, res) {
                    if (err1) throw err1;
                    console.log("1 document updated");
                    db.close();
                });
            } else {
                db.close();
            }

            res.json({
                status: true,
                data: []
            })
        });


    });

})






// create comment // not a good choice to user "GET" as method
postRoutes.get('/posts/:id/comments/:comment', (req, res) => {

    const Id = req.params.id
    const comment = req.params.comment;

    MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB_NAME);
        dbo.collection(ContainerNames.Post).findOne({ _id: ObjectId(Id) }, function (err, result) {
            if (err) throw err;
            console.log("result", result);

            // after fetching record
            if (result) {
                //read prev and push new
                let oldComments = result.comments;
                oldComments.push(comment)

                let myquery = { _id: ObjectId(Id) }

                //how new post object will look like
                var newvalues = { $set: { comments: oldComments } };

                //actual update procedure
                dbo.collection(ContainerNames.Post).updateOne(myquery, newvalues, function (err1, res) {
                    if (err1) throw err1;
                    console.log("1 document updated");
                    db.close();
                });
            } else {
                db.close();
            }

            res.json({
                status: true,
                data: []
            })
        });

    });



})



postRoutes.delete('/posts/:id/comments/:comment', (req, res) => {

    const Id = req.params.id
    const comment = req.params.comment

    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);

    // code to delete?
    let postIndex = postsList.findIndex(x => x.Id == Id)
    if (postIndex > -1) {
        let post = postsList[postIndex]

        let commentIndex = post.comments.findIndex(x => x == comment)
        if (commentIndex > -1) {
            //actual delete logic
            postsList[postIndex].comments.splice(commentIndex, 1)
        }

    }

    let dataToWrite = JSON.stringify(postsList)
    fs.writeFileSync('./data/articles.json', dataToWrite);

    res.json({
        status: true,
        data: postsList
    })
})




export default postRoutes;
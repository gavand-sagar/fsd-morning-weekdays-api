import { Router } from "express";
import fs from 'fs';
import { generateUUID } from '../utilities/utility.js'
const postRoutes = Router()

postRoutes.post('/posts', (req, res) => {

    //read from file to fetch prev data
    let fileContent = fs.readFileSync('./data/articles.json');

    // convert to json
    let postsList = JSON.parse(fileContent);


    let obj = {
        author: req.query.author,
        heading: req.query.heading,
        content: req.query.content,
        Id: generateUUID()
    }



    // push new item
    postsList.push(obj)

    // convert back to string
    let newFileContent = JSON.stringify(postsList)

    //write to file 

    fs.writeFileSync('./data/articles.json', newFileContent)


    res.json({})

})


postRoutes.get('/posts', (req, res) => {
    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);
    res.json(postsList)
})



postRoutes.get('/posts/:id', (req, res) => {

    let id = req.params.id

    let fileContent = fs.readFileSync('./data/articles.json');
    let data = JSON.parse(fileContent);

    let singleItem = data.find(x => x.Id == id)

    return res.json(singleItem)

})



postRoutes.delete('/posts/:id', (req, res) => {

    const Id = req.params.id

    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);


    // code to delete?
    let index = postsList.findIndex(x => x.Id == Id)
    if (index > -1) {
        postsList.splice(index, 1);
    }

    let dataToWrite = JSON.stringify(postsList)
    fs.writeFileSync('./data/articles.json', dataToWrite);

    res.json({
        status: true,
        data: postsList
    })
})




postRoutes.get('/posts/:id/like', (req, res) => {

    const Id = req.params.id

    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);


    // code to delete?
    let index = postsList.findIndex(x => x.Id == Id)
    if (index > -1) {
        if (!postsList[index].likes) {
            postsList[index].likes = 1;
        } else {
            postsList[index].likes = postsList[index].likes + 1;
        }

    }

    let dataToWrite = JSON.stringify(postsList)
    fs.writeFileSync('./data/articles.json', dataToWrite);

    res.json({
        status: true,
        data: postsList
    })
})





postRoutes.get('/posts/:id/dislike', (req, res) => {

    const Id = req.params.id

    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);


    // code to delete?
    let index = postsList.findIndex(x => x.Id == Id)
    if (index > -1) {
        if (!postsList[index].likes) {
            postsList[index].likes = 0;
        } else {
            postsList[index].likes = postsList[index].likes - 1;
        }

    }

    let dataToWrite = JSON.stringify(postsList)
    fs.writeFileSync('./data/articles.json', dataToWrite);

    res.json({
        status: true,
        data: postsList
    })
})







postRoutes.get('/posts/:id/comments/:comment', (req, res) => {

    const Id = req.params.id
    const comment = req.params.comment

    let fileContent = fs.readFileSync('./data/articles.json');
    let postsList = JSON.parse(fileContent);


    let index = postsList.findIndex(x => x.Id == Id)
    if (index > -1) {
        postsList[index].comments.push(comment)
    }



    let dataToWrite = JSON.stringify(postsList)
    fs.writeFileSync('./data/articles.json', dataToWrite);

    res.json({
        status: true,
        data: postsList
    })
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
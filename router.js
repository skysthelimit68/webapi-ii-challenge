const data = require("./data/db.js");
const router = require("express").Router();




//create post
router.post("/", (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return;
    }
    data
    .insert(req.body)
    .then( postID => {
        res.status(201).json(postID)
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

//create comment for the post
router.post("/:id/comments", (req, res) => {
    
})

//return an array of all the posts



//return post by id
router.get("/:id", (req, res) => {
    data.findById(req.params.id)
    .then( post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json(post)
    })
    .catch( error => {
        res.status(500).json(error)
    })
})


//return all comment from a post id



//remove post by ID, return the deleted post Object
router.delete("/:id", (req, res) => {
    
})


//update post by id, return modified post, not original



module.exports = router;
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
router.get("/", (req, res) => {
    data.find()
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch( error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})


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
router.get("/:id/comments", (req, res) => {
    data.findById(req.params.id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
            return;
        }
        data.findCommentById(req.params.id)
        .then( comments => {
            res.status(200).json(comments)
        })
        .catch( error => {
            res.status(500).json(error)
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


//remove post by ID, return the deleted post Object <<<=== need more work
router.delete("/:id", (req, res) => {
    data.remove(req.params.id)
    .then( result => {
        if(result === 0 ) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
            return;
        }
        res.status(200).json(result) //result is 1 if successfully deleted
    })
    .catch( error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})


//update post by id, return modified post, not original



module.exports = router;
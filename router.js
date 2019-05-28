const data = require("./data/db.js");
const router = require("express").Router();


//update post by id, return modified post, not original 
router.put("/:id", (req, res) => {
    const { title, contents } = req.body
    data.findById(req.params.id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
            data.update(req.params.id, req.body)
                .then(result => {
                    data.findById(req.params.id)
                        .then(post => {
                            if (post.length === 0) {
                                res.status(404).json({ message: "The post with the specified ID does not exist." })
                            }
                            res.status(200).json(post)
                        })
                        .catch(error => {
                            res.status(500).json(error)
                        })
                })
                .catch(error => {
                    res.status(500).json({ error: "The post information could not be modified." })
                })
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

//remove post by ID, return the deleted post Object VVV
router.delete("/:id", (req, res) => {
    data.findById(req.params.id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            const deletedPost = res.json(post)
            data.remove(req.params.id)
                .then(result => {
                    res.status(200).deletePost
                })
                .catch(error => {
                    res.status(500).json({ error: "The post could not be removed" })
                })
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})


//create comment for the post VVV
router.post("/:id/comments", (req, res) => {

    data.findById(req.params.id)
        .then( post => {
            const { text, post_id } = req.body
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
                return;
            }
            if (!text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            }
            data.insertComment(req.body)
                .then( async result => {
                    await data.findCommentById(result.id)
                        .then(comment => {
                            res.status(200).json(comment)
                        })
                })
                .catch(error => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})

//return an array of all the posts VVV
router.get("/", (req, res) => {
    data.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


//return post by id VVV
router.get("/:id", (req, res) => {
    data.findById(req.params.id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})


//return all comment from a post id VVV
router.get("/:id/comments", (req, res) => {
    data.findById(req.params.id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
                return;
            }
            data.findPostComments(req.params.id)
                .then(comments => {
                    res.status(200).json(comments)
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})



router.post("/", (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return;
    }
    data.insert(req.body)
    .then( async postID => {
        await data.findById(postID.id)
        .then( post => {
           if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(post)
        })
        .catch( error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    })
    .catch( error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})






module.exports = router;
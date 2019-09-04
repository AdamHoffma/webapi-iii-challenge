const express = require('express');
const db = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved"})
        })

});

router.get('/:id', (req, res) => {
    const postId = req.params.id 
    db.getById(postId)
        .then(post => {
            if (!post) {
                res.status(404).json({message: 'The post with the specified ID does not exist'})
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved"})
        })
});

router.delete('/:id', (req, res) => {
    const postId= req.params.id
    db.remove(postId)
        .then(removed => {
            if (!removed) {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            } else {
                res.status(200).json({message: "The post has been deleted"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
});

router.put('/:id', (req, res) => {
    const editedPost = req.body
    const postId = req.params.id
    if (!editedPost.text) {
        return res.status(400).json({message: "Please provide text for the post"})
    } else {
        db.getById(postId)
        .then(post => {
            if (!post) {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            } else {
                db.update(postId, editedPost)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(err => {
                    res.status(500).json({error: "The post information could not be changed"})
                })
            }
        })
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;
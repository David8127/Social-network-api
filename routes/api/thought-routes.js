
const router = require('express').Router();
const { Thought, Reaction } = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req, res) => {
    Thought.find({}, (err, thoughts) => {
        res.status(200).json(thoughts)
    })
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', (req, res) => {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    }, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(true)
        }
    })
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req, res) => {
    Thought.findById(req.params.thoughtId, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(thought)
        }
    })
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId', (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId, {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
    }, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).send( {message: "Successful Update!"} )
        }
    })
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).send( {message: "Deleted successfully!"} )
        }
    })
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req, res) => {
    
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {

})

module.exports = router;

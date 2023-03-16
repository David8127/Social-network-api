
const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req, res) => {
    Thought.find({}, (err, thoughts) => {
        res.status(200).json(thoughts)
    })
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/:userId', (req, res) => {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    }).then((thought) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { thoughts: thought._id } },
            { runValidators: true, new: true }
        ) .then((user) => {
            res.status(200).json(user)
        })
    }).catch((err) => 
        {res.status(500).json(err)
        console.log(err)});
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
    }, (err) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).send({ message: "Successful Update!" })
        }
    })
})

// TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json('Deleted the thought!')
        }
    })
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
}),

    // TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
    router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    })

module.exports = router;

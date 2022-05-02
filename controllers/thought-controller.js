const { Thought } = require('../models');

const thoughtController = {
  // the functions will go in here as methods
    // get all users
    getAllThoughts(req, res) {
        Thought.find({})
          .then(dbData => res.json(dbData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // get one thought by id
    getthoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbData => {
                // If no thought is found, send 404
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
        });
    },


    // createThought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbData => res.json(dbData))
        .catch(err => res.status(400).json(err));
    },
    
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add reaction
    addReaction({ params }, res) {

    },

    // delete reaction
    deleteReaction({ params }, res) {

    },
};

module.exports = thoughtController;
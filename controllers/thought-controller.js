const { Thought, User } = require('../models');

const thoughtController = {
  // the functions will go in here as methods
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .sort({ _id: -1 })
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
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true, runValidators: true }
            );
          })
          .then(dbData => {
            if (!dbData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbData);
          })
        .catch(err => res.status(400).json(err));
    },
    
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
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
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbData => {
                if (!dbData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { comments: params.thoughtId } },
                    { new: true, runValidators: true }
                  );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
            .catch(err => res.status(400).json(err));
    },

    // add reaction
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { replies: body } },
        { new: true }
      )
        .then(dbData => {
          if (!dbData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbData);
        })
        .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { replies: { replyId: params.reactionId } } },
        { new: true }
      )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;
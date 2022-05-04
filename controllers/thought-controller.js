const { Thought, User } = require('../models');

const thoughtController = {
  // the functions will go in here as methods
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .select('-__v')
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
            .select('-__v')
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
      User.findOne({ _id: params.userId })
      .then(UserData => {
        // If no user is found, send 404
        if (!UserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        Thought.create({thoughtText: body.thoughtText, userName: UserData.userName })
        .then(({ _id }) => {
          return UserData.updateOne(
            { $push: { thoughts: _id } }
          )
          .then(dbData => {
            console.log(dbData);
            res.json({ message: `Successfully Created Thought:${_id}` });
          })
        })
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
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
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json({ message: `Successfully Deleted Thought:${params.thoughtId}` }); 
        })
        .catch(err => res.json(err));
    },

    // add reaction
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
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
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;
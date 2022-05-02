const router = require('express').Router();
const {
getAllThoughts,
getthoughtById,
createThought,
updateThought,
deleteThought,
addReaction,
deleteReaction
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);
  
// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getthoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up POST at /:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// Set up DELETE at /api/users/:userId/friends/:friendId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);
  


module.exports = router;
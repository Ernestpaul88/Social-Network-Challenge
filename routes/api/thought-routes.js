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

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:userId')
  .post(createThought);
  
router
  .route('/:id')
  .get(getthoughtById)
  .put(updateThought);

router
  .route('/:userId/:thoughtId')
  .delete(deleteThought);

// Set up POST at /:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.put(addReaction);

// Set up DELETE at /api/users/:userId/friends/:friendId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);
  


module.exports = router;
const express = require('express');

const { createDiscussion, getAllDiscussions, getDiscussionsByUser, getDiscussionById, deleteDiscussion, updateDiscussion, addComment } = require('../controllers/discussion.controller.js');

const { fetchUserInCollection, verifyAuthor, fetchDiscussion, validateUserComment} = require('../middlewares/discussion.middleware.js');

const {validateApiKey} = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post('/new', fetchUserInCollection, createDiscussion);
router.get('/all1', validateApiKey, getAllDiscussions);
router.get('/user/:username', getDiscussionsByUser);
router.get('/id/:id', getDiscussionById);
router.delete('/id/:id',verifyAuthor, deleteDiscussion);
router.patch('/id/:id', verifyAuthor, updateDiscussion);
router.put('/:id/comment',fetchUserInCollection, fetchDiscussion, validateUserComment,addComment);

module.exports = router;


//
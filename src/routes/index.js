const router = require('express').Router();
const { verifyUserToken } = require("../middleware/auth");
const userController = require('./user');
const storiesRouter = require('./stories');

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

//Create a Story
router.post("/stories", verifyUserToken, storiesRouter.createStory);

//Get a Story With Id
router.get("/stories/:id", verifyUserToken, storiesRouter.getStoryForId);

//Update a Story status
router.put("/stories/:id", verifyUserToken, storiesRouter.changeStatus);

//Get All stories
router.get("/stories", verifyUserToken, storiesRouter.getStories);

module.exports = router;

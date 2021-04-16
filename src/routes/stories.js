const StoryService = require('../services/storyServices');
const storyValidator = require('../../validators/storyValidator');
const roleValidator = require('../../validators/roleValidator');

exports.createStory = async (req, res) => {
    const story = req.body;
    try {
        storyValidator.validate(story);
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
    const newlyCreatedStory = await StoryService.insertStory(story, req.user.id);
    return res.status(201).json(newlyCreatedStory);
}

exports.getStoryForId = async (req, res) => {
    const id = parseInt(req.params.id);

    const filteredStory = await StoryService.getStory(id);

    if (roleValidator.isAdmin(req.user.user_type_id)) {
        return res.status(200).json(filteredStory)
    }
    if (roleValidator.isUser(req.user.user_type_id)) {
        if (filteredStory.created_by_user_id === req.user.id.toString())
            return res.status(200).json(filteredStory);
    }
    res.status(401).send('Requested Story created by another user');
};

exports.changeStatus = async (req, res) => {
    const combinedStories = await StoryService.getAllStories();
    const newStory = req.body;
    const id = parseInt(req.params.id);
    const status = req.body.status;
    if(status !== 'accepted' && status !== 'rejected'){
        return res.status(400).send("Status should be 'accepted' or 'rejected'")
    }
    const storyById = combinedStories.find(story => story.id === id);
    if (!storyById) {
        return res.status(404).send("No Stories Found");
    }
    if (roleValidator.isAdmin(req.user.user_type_id)) {
        const story = {...storyById,...newStory};
        const updatedStory = await StoryService.updateStory(story);
        return res.status(200).json(updatedStory);
    }
    if (roleValidator.isUser(req.user.user_type_id)) {
        return res.status(403).send("You Don't have permission to modify story");
    }
};

exports.getStories = async (req, res) => {
    const user = req.user;
    if (roleValidator.isAdmin(req.user.user_type_id)) {
        const allStories = await StoryService.getAllStories();
        return res.status(200).json(allStories);
    }
    if (roleValidator.isUser(req.user.user_type_id)) {
        const filteredStory = await StoryService.getAllStoriesForUser(user);
        return res.status(200).json(filteredStory);
    }
};

const storyConfig = require('../config/storyConfig');
exports.validate = (story) => {
  if (!story) {
      throw new Error("No story found");
  }
  if (!story.type) {
    throw new Error("Story type missing");
  }
  if (storyConfig.storyTypes.indexOf(story.type) === -1) {
      throw new Error("Invalid story type given");
  }

  if (!story.complexity) {
    throw new Error("Story complexity missing");
  }
  if (storyConfig.storyComplexity.indexOf(story.complexity) === -1) {
      throw new Error("Invalid complexity given")
  }

  if (!story.summary) {
      throw new Error("Story summary missing");
  }
  if (!story.description) {
      throw new Error("Story description missing");
  }
};

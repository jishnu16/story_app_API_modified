const knex = require('../knex/knex.js');

const StoryService = {
  async insertStory(storyData, userId) {

    const storyToBeSaved = {
      summary: storyData.summary,
      description: storyData.description,
      type: storyData.type,
      complexity: storyData.complexity,
      estimated_time_of_completion: storyData.estimated_time_of_completion,
      cost: storyData.cost,
      created_by_user_id: userId
    }

    const insertedStoryId = await knex.insert(storyToBeSaved).into('story').returning('id');
    const savedStory = await knex.from('story').select('*').where('id',insertedStoryId );
    return savedStory[0];
  },

  async getStory(id) {
    const userStory = await knex.from('story').select('*').where('id', id);
    return userStory[0];
  },

  async getAllStoriesForUser(user) {

    return knex.from('story').select('*').where('created_by_user_id', user.id);
  },

  async getAllStories() {
    return knex.from('story').select('*');
  },

  async updateStory(storyData) {
    await knex.update(storyData).into('story').where('id', storyData.id);
    const updatedStory = await knex.from('story').select('*').where('id', storyData.id);
    return updatedStory[0];
  }
};

module.exports = StoryService;

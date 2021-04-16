const knex = require('../knex/knex.js');

const UserService = {
  async insertUser(newUser, hashedPassword) {
    const userToBeSaved = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      password: hashedPassword,
      email: newUser.email,
      user_type_id: '1'
    }

    const newlyCratedUserId = await knex.insert(userToBeSaved).into('user').returning("id");
    const savedUser = await knex.from('user').select('*').where('id', newlyCratedUserId);
    return savedUser[0];
  },

  async getUser(email) {
    const users = await knex.from('user').select('*').where('email', email);
    return users[0];
  }
};


module.exports = UserService;

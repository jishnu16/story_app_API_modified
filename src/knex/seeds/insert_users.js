
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: "Jishnu",
          last_name: "Sanyal",
          password: "hashed@@@password",
          email: 'jishnu@email.com',
          user_type_id: '1'
        },
        {
          first_name: "Ramu",
          last_name: "Kaka",
          password: "hashed@@@password",
          email: 'ramu@email.com',
          user_type_id: '0'
        }
      ]);
    })
};

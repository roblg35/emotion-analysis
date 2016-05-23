
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert(
    {
      email: "test@test.com",
      password: "password"
    }),
        
    knex('users').insert(
    {
      email: "robby@test.com",
      password: "password"
    })
    
   );
};	
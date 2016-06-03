
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('videos').del(), 

    // Inserts seed entries
    knex('videos').insert(
    {
      user_id: "1",
      video: "movie.mp4"
    }),
        
    knex('videos').insert(
    {
      user_id: "2",
      video: "testVid.mp4"
    })    
   );
};	
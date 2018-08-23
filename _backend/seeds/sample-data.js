const usersData = require('../sample_data/users_data');
const photoData = require('../sample_data/photo_data');
const connectionData = require('../sample_data/connection_data');
const conversationData = require('../sample_data/conversation_data');
const messageData = require('../sample_data/message_data');

exports.seed = function(knex) {
  return knex('message').del()
  .then(()=> knex('conversation').del())
  .then(()=> knex('connection').del())
  .then(()=> knex('photo').del())
  .then(()=> knex('users').del())
  .then(()=> knex('users').insert(usersData))
  .then(()=> knex('photo').insert(photoData))
  .then(()=> knex('connection').insert(connectionData))
  .then(()=> knex('conversation').insert(conversationData))
  .then(()=> knex('message').insert(messageData))
};
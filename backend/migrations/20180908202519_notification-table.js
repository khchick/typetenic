
exports.up = function(knex){
    return knex.schema.createTable('notification',(table)=>{
        table.increments('id').primary();
        table.string('title');
        table.text('content');
        table.enu('read_status', ['Unread', 'Read']);
        table.enu('type', ['Request Received', 'Request Approved', 'Request Rejected', 'Flip Request Received', 'Flip Request Approved', 'Connection Lost'])
        table.integer('type_id');
        table.integer('note_receiver_id').unsigned();
        table.foreign('note_receiver_id').references('users.id');
        table.timestamps(false, true);
    });
  }
  
  exports.down = function(knex){
    return knex.schema.dropTable('notification');
  }
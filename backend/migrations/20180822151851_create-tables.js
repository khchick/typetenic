
exports.up = function (knex, Promise) {
    return Promise.all([

        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('email');
            table.string('password');
            table.string('display_name');
            table.date('dob');
            table.enu('gender', ['M', 'F']);
            table.enu('orientation', ['Male', 'Female', 'Both'])
            table.string('location');
            table.string('mbti');
            table.enu('key_atr', ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']);
            table.text('key_atr_desc');
            table.text('profile_pic');
            table.string('ig_account');
            table.text('ideal_first_date');
            table.integer('token');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('photo', (table) => {
            table.increments('id').primary();
            table.text('path');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('connection', function (table) {
            table.increments('id').primary();
            table.integer('req_sender_id').unsigned();
            table.foreign('req_sender_id').references('users.id');
            table.integer('req_receiver_id').unsigned();
            table.foreign('req_receiver_id').references('users.id');
            table.enu('status', ['Requested', 'Rejected', 'Connected']);
            table.enu('flip_status', ['Requested', 'Rejected', 'Flipped']);
            table.integer('flip_req_sender');
            table.boolean('system_matched');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('conversation', function (table) {
            table.increments('id').primary();
            table.integer('msg_sender_id').unsigned();
            table.foreign('msg_sender_id').references('users.id');
            table.integer('msg_receiver_id').unsigned();
            table.foreign('msg_receiver_id').references('users.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('message', (table) => {
            table.increments('id').primary();
            table.integer('conversation_id').unsigned();
            table.foreign('conversation_id').references('conversation.id');
            table.text('content');
            table.timestamps(false, true);
        })
    ]);
};

exports.down = function (knex) {
    return knex.schema.dropTable('message')
        .then(() => {
            return knex.schema.dropTable('conversation')
                .then(() => {
                    return knex.schema.dropTable('connection')
                        .then(() => {
                            return knex.schema.dropTable('photo')
                                .then(() => {
                                    return knex.schema.dropTable('users')
                                });
                        });
                });
        });
};

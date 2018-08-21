table.increments('id').primary();
table.string('email');
table.string('password');
table.string('display_name');
table.date('dob');
table.enu('gender', ['M', 'F']);
table.enu('orientation', ['Male', 'Female', 'Both'])
table.string('location');
table.enu('key_atr', ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']);
table.text('key_atr_desc');
table.boolean('extroversion');
table.boolean('introversion');
table.boolean('sensing');
table.boolean('intuition');
table.boolean('thinking');
table.boolean('feeling');
table.boolean('judging');
table.boolean('perceving');
table.text('profile_pic');
table.string('ig_account');
table.text('ideal_first_date');
table.integer('token');

module.exports = [
    {
        
        email: 'King',
        password: 'qwertyui',
        display_name: 'https://media.giphy.com/media/E80ygOP1N5kpq/giphy.gif',
        dob: 'king@king.com',
        gender:'',
        
    },
    {
        name: 'Sonya',
        password: 'Sonya1234',
        img: 'https://5.imimg.com/data5/OK/OW/MY-37775609/lotus-flower-500x500.jpg',
        email: 'Sonya@gmail.com'
    },
    {
        name: 'Sam',
        password: 'Sam1234',
        img: 'https://5.imimg.com/data5/OK/OW/MY-37775609/lotus-flower-500x500.jpg',
        email: 'Sam@gmail.com'
    },
];
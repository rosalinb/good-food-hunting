// we want to create a dummy user so we can build the login functionality
// really has nothing to do with server.js (ui web app)
// we run by manually running the script in the terminal using node
// % node create_dummy_users.js

const bcrypt = require('bcrypt')
const db = require('./index.js')

const email = 'dt@ga.co'
const password = 'pudding'
const saltRounds = 10;

const sql = `
  INSERT INTO users (email, password_digest)
  VALUES ($1, $2);
`

// 1. generate some salt
bcrypt.genSalt(saltRounds, function(err, salt) {
  
  // 2. hash the password with the salt
  bcrypt.hash(password, salt, function(err, hash) {
    
    // 3. insert user & hashed password into database
    db.query(sql, [email, hash], (err, dbRes) => {
      if (err) {
        console.log(err);
      } else {
        console.log('user created')
      }
    })

  });

});





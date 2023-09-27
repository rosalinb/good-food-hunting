const db = require('../db')

function setCurrentUser(req, res, next) {
  // we use res.locals is when we want make available values in every templates
  res.locals.userId = req.session.userId

  if (!req.session.userId) {
    return next()
  }

  // all we have is just the id - we need to fetch from db
  const sql = `SELECT * FROM users WHERE id = $1;`

  db.query(sql, [req.session.userId], (err, dbRes) => {
    if (err) {
      console.log(err)
      process.exit(1) // stop the process
    } else {
      // user is logged in because
      // session has the userId set
      // making it easy to access user everywhere
      const user = dbRes.rows[0]
      res.locals.user = user
    }

    next()
  })
}

module.exports = setCurrentUser
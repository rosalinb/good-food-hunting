const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/users', (req, res) => {
  // req.body should contain email and password send by user
  // insert a new user record

  // sql = `insert into users ......`

  // db.query()

  res.redirect('/login')
})



module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('new_form')
})

router.post('/', ensureLoggedIn, (req, res) => {
  
  let title = req.body.title
  let imageUrl = req.body.image_url

  // insert a new dish into the dishes table
  const sql = `
    INSERT INTO dishes (title, image_url, user_id) 
    VALUES ($1, $2, $3);
  `

  db.query(sql, [title, imageUrl, req.session.userId], (err, dbRes) => {
    if (err) {
      console.log(err)
    }
    
    // res.send('thank you for making me rich...')
    res.redirect('/') // get
  })
})

router.delete('/:id', ensureLoggedIn, (req, res) => {
  const sql = `DELETE FROM dishes WHERE id = ${req.params.id};`

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/') // get '/
  })
})

router.get('/:id', (req, res) => {
  const sql = `SELECT * FROM dishes WHERE id = $1`
  const values = [req.params.id] // sanitising user input to make sure they are not being naughty

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    // happy path - bold move - got the dish
    let dish = dbRes.rows[0]

    res.render('show', { dish })
  })
})

router.get('/:id/edit', (req, res) => {

  let dishId = req.params.id
  let sql = `SELECT * FROM dishes WHERE id = $1;`

  db.query(sql, [dishId], (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    let dish = dbRes.rows[0]
    res.render('edit_form', { dish })
  })
})

router.put('/:id', (req, res) => {
  
  const sql = `
    UPDATE dishes
    SET title = $1, image_url = $2
    WHERE id = $3;
  `
  const values = [req.body.title, req.body.image_url, req.params.id]

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    // redirect back to show the 
    res.redirect(`/dishes/${req.params.id}`) // redirects are get requests
  })
})

module.exports = router
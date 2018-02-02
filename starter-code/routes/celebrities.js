const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

// READ 
router.get('/', (req, res, next) => {
  console.log("GET")
  Celebrity.find().exec((err, celebrities) => {
    if (err) { return next(err); }
    res.render('celebrities/index', {
      celebrities: celebrities
    });
  });
});

// CREATE

router.get('/new', (req,res) => {
  console.log("NEW GET")
  res.render('celebrities/new');
});

router.post('/newCeleb', (req, res, next) => {
  console.log("NEW POST")
  const {name,occupation,catchPhrase} = req.body;
  const celebrity = new Celebrity({name,occupation,catchPhrase});
  celebrity.save( err => {
    if (err) { return next(err) }
    res.redirect('/celebrities');
  })
});

// READ DETAIL
router.get('/:id', (req,res,next) => {
  console.log("ID")
  const celebId = req.params.id;
  Celebrity.findById(celebId).exec((err,celebrity) => {
    if (err) { return next(err); }
    res.render('celebrities/show', { celebrity: celebrity });
  })
})


module.exports = router;
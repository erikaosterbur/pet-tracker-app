const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage'); // homepage handlebar
});

module.exports = router;

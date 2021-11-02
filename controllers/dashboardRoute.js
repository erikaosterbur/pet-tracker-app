const router = require('express').Router();
const { Pet } = require('../models/');
const withAuth = require('../utils/auth');

// ALL PETS
router.get('/', withAuth, async (req, res) => {
    try {
      const petData = await Pet.findAll({
        where: {
            user_id: req.session.user_id,
          },
      });
  
      const pets = petData.map((pet) =>
        pet.get({ plain: true })
      );
  
      res.render('all-pets', { // all-pets handlebar
        layout: 'dashboard',
        pets,
      });
    } catch (err) {
      res.redirect('login'); // login handlebar
    }
  });

// NEW PET  
router.get('/new', withAuth, (req, res) => {
    res.render('newpet', { // new-pet handlebar
      layout: 'dashboard',
    });
  });

// UPDATE PET  
router.get('/edit', withAuth, (req, res) => {
  res.render('edit-pet', { // update-pet handlebar
    layout: 'dashboard',
  });
});

// DELETE A PET
router.get('/delete', withAuth, (req, res) => {
  res.render('edit-pet', { // delete-pet handlebar
    layout: 'dashboard',
  });
});

  module.exports = router;
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
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.redirect('/api/users/login'); // login handlebar
    }
  });

// NEW PET  
router.get('/new', withAuth, (req, res) => {
    res.render('newpet', { // new-pet handlebar
      layout: 'dashboard',
      logged_in: req.session.logged_in,
    });
  });

// UPDATE PET  
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
    });

    const pet = petData.get({ plain: true });
    
    res.render('edit-pet', {
        layout: 'dashboard',
        pet,
        logged_in: req.session.logged_in,
    });
  } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE A PET
router.get('/delete', withAuth, (req, res) => {
  res.render('edit-pet', { // delete-pet handlebar
    layout: 'dashboard',
    logged_in: req.session.logged_in,
  });
});

  module.exports = router;
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
    res.render('new-pet', { // new-pet handlebar
      layout: 'dashboard',
    });
  });

// EDIT PET OPTION IN DASHBOARD?
// router.get('/edit/:id', withAuth, async (req, res) => {
//     try {
//       const petData = await Pet.findByPk(req.params.id);
  
//       if (petData) {
//         const pet = petData.get({ plain: true });
  
//         res.render('edit-pet', { // edit-pet handlebar
//           layout: 'dashboard',
//           pet,
//         });
//       } else {
//         res.status(404).end();
//       }
//     } catch (err) {
//       res.redirect('login'); // login handlebar
//     }
// });

  module.exports = router;
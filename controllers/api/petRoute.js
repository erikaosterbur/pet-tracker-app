const router = require('express').Router();
const { Pet, Vet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
    });

    const vetData = await Vet.findAll({
      where: {
        pet_id: req.params.id,
      }
    })

    if (!petData) {
      res.status(404).json({ message: "No pet found with that id :("})
      return;
    }

    const vets = vetData.map((vet) =>
      vet.get({ plain: true })
      );

    const pet = petData.get({ plain: true});

    let petImage;

    if (petData.pet_type === 'Dog') {
      petImage = '/images/dog.jpg';
    } else if (petData.pet_type === 'Cat') {
      petImage = '/images/cat.jpg';
    } else {
      petImage = '/images/jabba.png';
    } 

    res.render('petprofile', { 
      layout: 'dashboard',
      pet,
      vets,
      petImage,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Create a new Pet
router.post('/', withAuth, async (req, res) => {
    try {
        const newPet = await Pet.create({
            ...req.body,
            user_id: req.session.user_id, 
        });

        res.status(200).json(newPet);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Delete Pet
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.id,
          user_id:req.session.user_id, 
        }
      });
  
      if(!petData) {
        res.status(404).json({ message: "No pet found with id :("})
        return;
      }
  
      res.status(200).json(petData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

//Update Pet
router.put('/:id', (req, res) => {
    Pet.update( req.body, {
//Possible changes
        where: {
            id: req.params.id,
            user_id:req.session.user_id, 
        }
    })
    .then((updatedPet) => {
        res.json(updatedPet)
    })
    .catch((err) => { res.json(err)
    console.log(err) })
});
  
router.get('/', withAuth, async (req, res) => {
  try {
    const vetData = await Vet.findAll({
      where: {
          user_id: req.session.user_id,
        },
    });

    const vets = vetData.map((vet) =>
      vet.get({ plain: true })
    );

    res.render('vet-visit', { 
      layout: 'dashboard',
      vets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.redirect('/api/users/login'); // login handlebar
  }
});

// NEW PET  
router.get('/:id/new/vet', withAuth, (req, res) => {
  const pet = {id: req.params.id}
  res.render('new-vet-visit', { 
    layout: 'dashboard',
    pet,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
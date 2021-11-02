const router = require('express').Router();
const { request } = require('express');
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

//Create a new Pet
router.post('/', withAuth, async (req, res) => {
    try {
        const newPet = await Pet.create({
            ...req.body,
            user_id:req.session.user_id, 
        });

        res.status(200).json(newPet);
    }catch (err) {
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
    .catch((err) => res.json(err),
    console.log(err))
});


module.exports = router;
const router = require('express').Router();
const { Vet, Pet } = require('../../models');
const withAuth = require('../../utils/auth')

//Get all visit
//Get visit by id
//Create visit
//Update visit
//Delete visit


//Pulling all vet visits
router.get('/', withAuth, async (req, res) => {
    try {
      const vetData = await Vet.findAll({
        include: [{model: Pet}]
      });
      res.status(200).json(vetData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
});

//Pulling vet visit by id
router.get('/:id', withAuth, async (req, res) => {
    try {
      const vetData = await Vet.findByPk(req.params.id, {
        indclude: [{ model: Pet }]
      });
  
      if (!vetData) {
        res.status(404).json({ message: "No vet visit found with that id :("})
        return;
      }
  
      res.status(200).json(vetData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

//Create new vet visit
router.post('/', withAuth, async (req, res) => {
    try {
      const vetData = await Vet.create(req.body);
      res.status(200).json(vetData);
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }

});

//Update Vet visit
//Likely needs tweaking
router.put('/:id', withAuth, (req, res) => {
    Vet.update( req.body, {
//This part is iffy
      where: {
        id: req.params.id,
      }
    })
    .then((updatedVet) => {
      res.json(updatedVet)
    })
    .catch((err) => res.json(err),
    console.log(err))
});

//Delete a vet visit
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const vetData = await Vet.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if(!vetData) {
        res.status(404).json({ message: "No vet visit found with that id :("})
        return;
      }
  
      res.status(200).json(vetData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

module.exports = router;
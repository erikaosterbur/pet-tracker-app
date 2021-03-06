const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//create new user route
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        const betterUser = userData.get({plain: true});
        console.log(betterUser);

        req.session.save(() => {
            req.session.user_id = betterUser.id;
            req.session.username = betterUser.username;
            req.session.logged_in = true;

            res.status(200).json(betterUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }});

        if(!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
       
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again '});
            return;
        }
        console.log(validPassword);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


//delete user route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
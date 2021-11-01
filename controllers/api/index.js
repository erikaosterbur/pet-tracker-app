const router = require('express').Router();
const petRoutes = require('./petRoute');
const userRoutes = require('./userRoute');
const vetVisitRoutes = require('./vet-visitRoute');

router.use('/pets', petRoutes);
router.use('/users', userRoutes);
router.use('/vet-visits', vetVisitRoutes);

module.exports = router;
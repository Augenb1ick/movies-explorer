const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');
const authRoutes = require('./auth');

// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

router.use(authRoutes);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/*', (req, res, next) => next(new NotFoundError('Такой страницы не существует.')));

module.exports = router;

const router = require('express').Router();

const { getAllMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/', getAllMovies);

router.post('/', movieValidation, postMovie);

router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;

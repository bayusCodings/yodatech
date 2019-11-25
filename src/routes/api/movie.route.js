import { Router } from 'express';
const router = Router();

import MovieController from '../../controllers/movie.controller';

router.get('/movie', MovieController.getAllMovies);
router.get('/movie/:id/characters', MovieController.getMovieCharacters)
router.get('/movie/:id/comments', MovieController.getMovieComments)

export default router;

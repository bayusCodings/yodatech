import { Router } from 'express';
const router = Router();

import MovieController from '../../controllers/movie.controller';

router.get('/movies', MovieController.getAllMovies);
router.get('/movie/:id/characters', MovieController.getMovieCharacters)

export default router;

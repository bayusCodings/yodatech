import { Router } from 'express';
const router = Router();

import CommentController from '../../controllers/comment.controller';
import CommentValidator from '../../validators/comment.validator';

router.post('/comment/new', CommentValidator.validateComment, CommentController.addNewComment);
router.get('/comments/:movieId', CommentController.getMovieComments)

export default router;

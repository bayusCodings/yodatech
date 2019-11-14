import { Router } from 'express';
const router = Router();

import CommentController from '../../controllers/comment.controller';
import CommentValidator from '../../validators/comment.validator';

router.post('/comment', CommentValidator.validateComment, CommentController.addNewComment);

export default router;

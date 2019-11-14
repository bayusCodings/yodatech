import CommentService from '../services/comment.service';

class CommentController {
  static async addNewComment(req, res, next) {
    const { movieId, comment } = req.body;
    try {
      const newComment = { 
        movieId, 
        comment,
        ipAddress: req.connection.remoteAddress
      };
      const createdComment = await CommentService.create(newComment);
      return res.status(200).json({ success: true, data: createdComment });
    } catch(e) {
      next(e);
    }
  }
}
    
export default CommentController;
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

  static async getMovieComments(req, res, next) {
    const { movieId } = req.params;
    try {
      const movieComments = await CommentService.getCommentsByMovie(movieId);
      return res.status(200).json({ success: true, data: movieComments });
    } catch(e) {
      next(e);
    }
  }
}
    
export default CommentController;
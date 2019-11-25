import CommentService from '../services/comment.service';

/**
 *
 *
 * @class CommentController
 */
class CommentController {
  /**
   * Make new comment on a movie
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, newly created comment
   * @memberof CommentController
   */
  static async addNewComment(req, res, next) {
    const { movieId, comment } = req.body;
    try {
      const newComment = { 
        movieId: Number(movieId), 
        comment,
        ipAddress: req.connection.remoteAddress
      };
      const createdComment = await CommentService.create(newComment);
      return res.status(201).json({ success: true, data: createdComment });
    } catch(e) {
      next(e);
    }
  }
}
    
export default CommentController;
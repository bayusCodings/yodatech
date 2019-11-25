import { Comment } from '../database/models';

/**
 *
 *
 * @class CommentService
 */
class CommentService {
  /**
   * create new comment
   *
   * @static
   * @param {object} comment comment data(movieId, comment, ipAddress)
   * @returns {object} newly created comment
   * @memberof CommentService
   */
  static create(comment) {
    return Comment.create(comment);
  }

  /**
   * get all comments by movie id
   *
   * @static
   * @param {number} movieId movie id
   * @returns {Array} list of movie comments
   * @memberof CommentService
   */
  static getCommentsByMovie(movieId) {
    return Comment.findAll({ 
      where: {movieId: movieId},
      order: [
        ['id', 'DESC']
      ]
    })
  }

  /**
   * counts all comments by movie id
   *
   * @static
   * @param {number} movieId movie id
   * @returns {number} total count of comment for a movie
   * @memberof CommentService
   */
  static getMovieCommentCount(movieId) {
    return Comment.count({ where: {movieId: movieId} })
  }
}

export default CommentService;
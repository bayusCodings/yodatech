import { Comment } from '../database/models';
import cache from 'memory-cache';

const memCache = new cache.Cache();

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
  static async create(comment) {
    const key = 'getCommentsByMovie'+comment.movieId;
    const response = await Comment.create(comment);

    memCache.del(key);
    return response;
  }

  /**
   * get all comments by movie id
   *
   * @static
   * @param {number} movieId movie id
   * @returns {Array} list of movie comments
   * @memberof CommentService
   */
  static async getCommentsByMovie(movieId) {
    const key = 'getCommentsByMovie'+movieId;
    const cacheContent = memCache.get(key);
    
    if(cacheContent)
      return cacheContent;

    const response = await Comment.findAll({ 
      where: {movieId: movieId},
      order: [
        ['id', 'DESC']
      ]
    });

    memCache.put(key, response);
    return response;
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
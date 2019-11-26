import { Comment } from '../database/models';
import { REDIS_URL } from '../config/keys'
import redis from 'redis';
import util from 'util';

const client = redis.createClient(REDIS_URL);
client.hget = util.promisify(client.hget)
const hashKey = 'yodatech';

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

    client.hdel(hashKey, key)
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
    const cacheContent = await client.hget(hashKey, key);

    if(cacheContent)
      return JSON.parse(cacheContent);

    const response = await Comment.findAll({ 
      where: {movieId: movieId},
      order: [
        ['id', 'DESC']
      ]
    });

    client.hset(hashKey, key, JSON.stringify(response), 'EX', 86400);
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
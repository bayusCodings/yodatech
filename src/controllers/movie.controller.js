import MovieService from '../services/movie.service';
import CommentService from '../services/comment.service';

/**
 *
 *
 * @class MovieController
 */
class MovieController {
  /**
   * Get list of all movies
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, list of movies
   * @memberof MovieController
   */
  static async getAllMovies(req, res, next) {
    try {
      const allMovies = await MovieService.getAllMovies();
      const movieList = await MovieService.addCommentCount(allMovies)
      const movies = MovieService.sortByReleseDate(movieList)
      return res.status(200).json({ success: true, message: "ok", data: movies });
    } catch(e) {
      next(e);
    }
  }

  /**
   * Get list of characters for a movie
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, list of characters for a movie
   * @memberof MovieController
   */
  static async getMovieCharacters(req, res, next) {
    const { id } = req.params;
    const { sort, order, gender } = req.query;

    const idExist = await MovieService.getMoviebyId(id);
    if(!idExist) return res.status(422).json({ success: false, message: "parameter id is non-existent" });

    try {
      const data = {};

      const movieCharacters = await MovieService.getMovieCharacters(id);
      data.result = movieCharacters;
      data.count = movieCharacters.length;

      if(typeof sort !== 'undefined'){
        const characters = MovieService.sortCharacters(movieCharacters, sort, order);
        data.count = characters.length;
        data.result = characters;
      }

      if(typeof gender !== 'undefined'){
        const characterList = MovieService.filterByGender(movieCharacters, gender);
        data.count = characterList.length;
        data.result = characterList;
      }

      const metaData = MovieService.getTotalHeight(data.result);

      return res.status(200).json({ 
        success: true, 
        message: "ok",
        count: data.count,
        data: data.result, 
        metaData
      });
    } catch(e) {
      next(e);
    }
  }

  /**
   * Get list of all comments for a movie
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, list of movie comments
   * @memberof MovieController
   */
  static async getMovieComments(req, res, next) {
    const { id } = req.params;
    try {
      const idExist = await MovieService.getMoviebyId(id);
      if(!idExist) return res.status(422).json({ success: false, message: "parameter id is non-existent" });

      const movieComments = await CommentService.getCommentsByMovie(id);
      return res.status(200).json({ success: true, message: "ok", data: movieComments });
    } catch(e) {
      next(e);
    }
  }
}
    
export default MovieController;
import MovieService from '../services/movie.service';
import CommentService from '../services/comment.service';

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const movieList = await MovieService.getAllMovies();
      const movies = MovieService.sortByReleseDate(movieList.results)
      return res.status(200).json({ success: true, data: movies });
    } catch(e) {
      next(e);
    }
  }

  static async getMovieCharacters(req, res, next) {
    let data = {};
    const { id } = req.params;
    const { sort, filter } = req.query

    try {
      const movieCharacters = await MovieService.getMovieCharacters(id);
      data.result = movieCharacters;

      if(typeof sort !== 'undefined'){
        const sortedCharacters = MovieService.sortCharacters(movieCharacters, sort);
        const totalHeight = MovieService.getTotalHeight(sortedCharacters);
        data.result = sortedCharacters
        data.metadata = {
          count: sortedCharacters.length,
          height: {
            cm: totalHeight,
            feet: MovieService.centimeterToFoot(totalHeight),
            inches: MovieService.centimeterToInch(totalHeight)
          }
        }
      }

      if(typeof filter !== 'undefined'){
        const filteredCharacters = MovieService.filterByGender(movieCharacters, filter);
        const totalHeight = MovieService.getTotalHeight(filteredCharacters);
        data.result = filteredCharacters
        data.metadata = {
          count: filteredCharacters.length,
          height: {
            cm: totalHeight,
            feet: MovieService.centimeterToFoot(totalHeight),
            inches: MovieService.centimeterToInch(totalHeight)
          }
        }
      }

      return res.status(200).json({ success: true, data });
    } catch(e) {
      next(e);
    }
  }

  static async getMovieComments(req, res, next) {
    const { id } = req.params;
    try {
      const movieComments = await CommentService.getCommentsByMovie(id);
      return res.status(200).json({ success: true, data: movieComments });
    } catch(e) {
      next(e);
    }
  }
}
    
export default MovieController;
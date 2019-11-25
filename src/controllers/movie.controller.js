import MovieService from '../services/movie.service';
import CommentService from '../services/comment.service';

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const movieList = await MovieService.getAllMovies();
      const movies = MovieService.sortByReleseDate(movieList.results)
      return res.status(200).json({ success: true, message: "ok", data: movies });
    } catch(e) {
      next(e);
    }
  }

  static async getMovieCharacters(req, res, next) {
    const { id } = req.params;
    const { sort, order, gender } = req.query;

    const idExist = await MovieService.getMoviebyId(id);
    if(!idExist) return res.status(422).json({ success: false, message: "parameter id is non-existent" });

    try {
      let data = {};

      const movieCharacters = await MovieService.getMovieCharacters(id);
      data.result = movieCharacters;

      if(typeof sort !== 'undefined'){
        const characters = MovieService.sortCharacters(movieCharacters, sort, order);
        const sortedCharacters = MovieService.addMetaData(characters);
        data.count = sortedCharacters.length;
        data.result = sortedCharacters;
      }

      if(typeof gender !== 'undefined'){
        const characterList = MovieService.filterByGender(movieCharacters, gender);
        const filteredCharacters = MovieService.addMetaData(characterList);
        data.count = filteredCharacters.length;
        data.result = filteredCharacters;
      }

      return res.status(200).json({ success: true, message: "ok", data: data.result, count: data.count });
    } catch(e) {
      next(e);
    }
  }

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
import Parent from './parent';
import MovieService from '../services/movie.service';

class CommentValidator {
  static async validateComment(req, res, next) {
    let constraints = {
      movieId: {
        presence: {
          allowEmpty: false,
          message: '^movieId field is required'
        },
        id_exist: {
          movieService: MovieService
        }
      },

      comment: {
        presence: {
          allowEmpty: false,
          message: '^comment field is required'
        },
        length: {
          maximum: 500
        }
      }
    }

    let body = { ...req.body };
    Parent.resolveValidation(res, next, body, constraints);
  }
}

export default CommentValidator;
import Parent from './parent';
import { Comment } from '../database/models';

class CommentValidator {
  static validateComment(req, res, next) {
    let constraints = {
      movieId: {
        presence: {
          allowEmpty: false,
          message: '^movieId field is required'
        },
        value_exist: {
          movieIdList: ['1','2','3','4','5','6','7']
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
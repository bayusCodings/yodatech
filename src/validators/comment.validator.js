import Parent from './parent';

class CommentValidator {
  static validateComment(req, res, next) {
    let constraints = {
      movieId: {
        presence: {
          allowEmpty: false,
          message: '^movieId field is required'
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
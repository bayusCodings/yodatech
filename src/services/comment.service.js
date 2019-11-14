import { Comment } from '../database/models';

class CommentService {
  static create(comment) {
    return Comment.create(comment);
  }

  static getCommentsByMovie(movieId) {
    return Comment.findAll({ 
      where: {movieId: movieId},
      order: [
        ['id', 'DESC']
      ]
    })
  }

  // counts all comments for a movie
  static getMovieCommentCount(movieId) {
    return Comment.count({ where: {movieId: movieId} })
  }
}

export default CommentService;
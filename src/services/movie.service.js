import request from 'request-promise-native';
import { BASE_URL } from '../config/keys';
import CommentService from './comment.service';

class MovieService {
  static getAllMovies() {
    let options = {
      method: 'GET',
      json: true,
      uri: BASE_URL+'/films',
      transform: async function (body, response, resolveWithFullResponse) {
        let list = await Promise.all(
          body.results.map(async (item) => {
            let url = item.url;
            const extractedId = url[url.length - 2];
            const commentCount = await CommentService.getMovieCommentCount(extractedId);

            return {
              id: extractedId,
              title: item.title,
              opening_crawl: item.opening_crawl,
              release_date: item.release_date,
              commentCount
            };
          })
        );

        return { results: list }
      }
    };
    
    return request(options);
  }

  static getMovieCharacters(id) {
    let options = {
      method: 'GET',
      json: true,
      uri: BASE_URL+'/films/'+id,
      transform: function (body, response, resolveWithFullResponse) {
        const allRequests = body.characters.map(uri => 
          request({ method: 'GET', json: true, uri }).then()
        );

        return Promise.all(allRequests);
      }
    };
    
    return request(options);
  }

  static sortCharacters(data, sort) {
    const [sortBy, order] = sort.split(' ');

    if(sortBy != 'height'){
      if (order == 'asc')
        return data.sort((a,b) => (a[sortBy] < b[sortBy]) ? -1 : ((b[sortBy] < a[sortBy]) ? 1 : 0));
      return data.sort((a,b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0));
    }
    else {
      if (order == 'asc')
        return data.sort((a,b) => (parseInt(a[sortBy]) < parseInt(b[sortBy])) ? -1 : ((parseInt(b[sortBy]) < parseInt(a[sortBy])) ? 1 : 0));
      return data.sort((a,b) => (parseInt(a[sortBy]) < parseInt(b[sortBy])) ? 1 : ((parseInt(b[sortBy]) < parseInt(a[sortBy])) ? -1 : 0));
    }
  }

  static sortByReleseDate(data) {
    return data.sort((a,b) => new Date(b.release_date) - new Date(a.release_date))
  }

  static filterByGender(data, filter) {
    return data.filter(datum => {
      return datum.gender == filter
    });
  }

  static getTotalHeight(data) {
    let total = 0;
    for(let datum of data){
      total = total + parseInt(datum.height)
    }

    return total;
  }

  static centimeterToFoot(heightIncm) {
    return heightIncm/30.48;
  }

  static centimeterToInch(heightIncm) {
    return heightIncm/2.54;
  }
}

export default MovieService;
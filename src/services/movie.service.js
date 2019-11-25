import { BASE_URL } from '../config/keys';
import CommentService from './comment.service';
import Http from './http.service';

/**
 *
 *
 * @class MovieService
 */
class MovieService {
  /**
   * Get list of all movies
   *
   * @static
   * @returns {Array} list of all movies
   * @memberof MovieService
   */
  static getAllMovies() {
    const payload = {};

    const transform = async function (body, response, resolveWithFullResponse) {
      const list = await Promise.all(
        body.results.map(async (item) => {
          const url = item.url;
          const extractedId = url[url.length - 2];
          const commentCount = await CommentService.getMovieCommentCount(extractedId);

          return {
            id: extractedId,
            title: item.title,
            openingCrawl: item.opening_crawl,
            releaseDate: item.release_date,
            commentCount
          };
        })
      );

      return { results: list }
    }

    payload.uri = BASE_URL+'/films';
    payload.transform = transform;
    
    return Http.get(payload);
  }

  /**
   * Get movie by id
   *
   * @static
   * @param {number} id movie id
   * @returns {object} movie data
   * @memberof MovieService
   */
  static async getMoviebyId(id) {
    const payload = {
      uri: BASE_URL+'/films/'+id,
    }
    
    try {
      await Http.get(payload);
      return true;
    } catch (e) {
      // could not find movie by id
      return false;
    }
  }

  /**
   * Get character list for a movie
   *
   * @static
   * @param {number} id movie id
   * @returns {Array} list of movie characters
   * @memberof MovieService
   */
  static async getMovieCharacters(id) {
    const payload = {};

    const transform = function (body, response, resolveWithFullResponse) {
      const allRequests = body.characters.map(uri => 
        // call endpoint to get character
        Http.get({ uri }).then()
      );

      return Promise.all(allRequests);
    }

    payload.uri = BASE_URL+'/films/'+id;
    payload.transform = transform;
    
    const data = await Http.get(payload);
    return this.toCamelCase(data);
  }

  /**
   * sort character list
   *
   * @static
   * @param {Array} data list of un-sorted characters
   * @param {string} sortBy field to sort by
   * @param {string} order chronological order
   * @returns {Array} list of sorted characters
   * @memberof MovieService
   */
  static sortCharacters(data, sortBy, order) {
    if(typeof order === 'undefined') order = 'asc';
    
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

  /**
   * sort movies by release date
   *
   * @static
   * @param {Array} data list of un-sorted movies
   * @returns {Array} list of sorted movies
   * @memberof MovieService
   */
  static sortByReleseDate(data) {
    return data.sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  }

  /**
   * filter characters by gender
   *
   * @static
   * @param {Array} data list of un-filtered characters
   * @param {string} gender gender to filter by
   * @returns {Array} list of sorted movies
   * @memberof MovieService
   */
  static filterByGender(data, gender) {
    return data.filter(datum => {
      return datum.gender == gender
    });
  }

  /**
   * add meta data to character list
   *
   * @static
   * @param {Array} data list of characters
   * @returns {Array} list of characters with meta data
   * @memberof MovieService
   */
  static addMetaData(data) {
    const characters = data.map(item => {
      return {
        ...item,
        metadata: {
          totalHeight: {
            cm: item.height,
            feet: this.centimeterToFoot(item.height),
            inches: this.centimeterToInch(item.height)
          }
        }
      }
    });

    return characters;
  }

  /**
   * convert centimeter to foot
   *
   * @static
   * @param {number} heightIncm centimeter height
   * @returns {string} converted value
   * @memberof MovieService
   */
  static centimeterToFoot(heightIncm) {
    const result = heightIncm/30.48;
    return result.toFixed(2);
  }

  /**
   * convert centimeter to inch
   *
   * @static
   * @param {number} heightIncm centimeter height
   * @returns {string} converted value
   * @memberof MovieService
   */
  static centimeterToInch(heightIncm) {
    const result = heightIncm/2.54;
    return result.toFixed(2);
  }

  /**
   * parse to camel case
   *
   * @static
   * @param {Array} data parse data fields to camel case
   * @returns {Array} parsed data
   * @memberof MovieService
   */
  static async toCamelCase(data) {
    return await Promise.all(
      data.map(async (item) => {
        return {
          name: item.name,
          height: item.height,
          mass: item.mass,
          hairColor: item.hair_color,
          skinColor: item.skin_color,
          eyeColor: item.eye_color,
          birthYear: item.birth_year,
          gender: item.gender,
          homeWorld: item.homeworld,
          films: item.films,
          species: item.species,
          vehicles: item.vehicles,
          starships: item.starships,
          created: item.created,
          edited: item.edited,
          ur: item.url,
        };
      })
    );
  }
}

export default MovieService;
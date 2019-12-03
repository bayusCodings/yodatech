import { BASE_URL, REDIS_URL } from '../config/keys';
import CommentService from './comment.service';
import Http from './http.service';
import redis from 'redis';
import util from 'util';

const client = redis.createClient(REDIS_URL);
client.hget = util.promisify(client.hget)
const hashKey = 'yodatech';

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
  static async getAllMovies() {
    const payload = {};
    const key = 'movies'

    const cacheContent = await client.hget(hashKey, key);
    if(cacheContent) 
      return JSON.parse(cacheContent);

    const transform = async function (body, response, resolveWithFullResponse) {
      const list = await Promise.all(
        body.results.map(async (item) => {
          const url = item.url;
          const extractedId = url[url.length - 2];

          return {
            id: extractedId,
            title: item.title,
            openingCrawl: item.opening_crawl,
            releaseDate: item.release_date,
          };
        })
      );

      return list
    }

    payload.uri = BASE_URL+'/films';
    payload.transform = transform;
    
    const response = await Http.get(payload);
    client.hset(hashKey, key, JSON.stringify(response), 'EX', 86400);

    return response;
  }

  /**
   * Get movie by id
   *
   * @static
   * @param {number} id movie id
   * @returns {boolean} true if found by id, false if not
   * @memberof MovieService
   */
  static async getMoviebyId(id) {
    const key = 'getMovieById'+id;
    const payload = {
      uri: BASE_URL+'/films/'+id,
    }

    const cacheContent = await client.hget(hashKey, key);
    if(cacheContent != null)
      return JSON.parse(cacheContent);
    
    try {
      await Http.get(payload);
      // cmovie was found
      client.hset(hashKey, key, JSON.stringify(true), 'EX', 86400);
      return true;
    } catch (e) {
      // could not find movie by id
      client.hset(hashKey, key, JSON.stringify(false), 'EX', 86400);
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
    const key = 'getMovieCharacters'+id;

    const cacheContent = await client.hget(hashKey, key);
    if(cacheContent) 
      return JSON.parse(cacheContent);

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
    const response = await this.toCamelCase(data);

    client.hset(hashKey, key, JSON.stringify(response), 'EX', 86400);
    return response;
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
   * get total character height
   *
   * @static
   * @param {Array} data list of characters
   * @returns {object} total character height in cm, feet and inches
   * @memberof MovieService
   */
  static getTotalHeight(data) {
    const totalCharacterHeight = this.countTotalHeight(data);
    return {
      totalHeight: {
        cm: totalCharacterHeight,
        feet: this.centimeterToFoot(totalCharacterHeight),
        inches: this.centimeterToInch(totalCharacterHeight)
      }
    }
  }

  /**
   * sum all character height
   *
   * @static
   * @param {Array} data list of characters
   * @returns {number} total character height
   * @memberof MovieService
   */
  static countTotalHeight(data) {
    const reducer = (accumulator, currentValue) => Number(accumulator.height) + Number(currentValue.height);
    return data.reduce(reducer);
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
          url: item.url,
        };
      })
    );
  }

  /**
   * add comment count to movies
   *
   * @static
   * @param {Array} data list of movies
   * @returns {Array} list of movies with comment count
   * @memberof MovieService
   */
  static async addCommentCount(data) {
    const movieList = await Promise.all(
      data.map(async item => {
        return {
          ...item,
          commentCount: await CommentService.getMovieCommentCount(item.id)
        }
      })
    );

    return movieList;
  }
}

export default MovieService;
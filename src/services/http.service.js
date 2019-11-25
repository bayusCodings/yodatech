import request from 'request-promise-native';

/**
 *
 *
 * @class Http
 */
class Http {
  /**
   * make http get request
   *
   * @static
   * @param {object} payload request payload (uri, transform)
   * @returns {json} response data
   * @memberof Http
   */
  static get(payload) {
    const options = {}

    options.method = 'GET';
    options.json = true;
    options.uri = payload.uri;

    if(typeof payload.transform !== 'undefined')
      options.transform = payload.transform;
      
    return request(options);
  }
}

export default Http;
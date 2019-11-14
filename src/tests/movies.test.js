import request from 'supertest';
import chai  from 'chai';
import app from '../'

const expect = chai.expect;

describe('GET /movies', () => {
  it('should get list of all movies', async () => {
    const url = '/movies';
    const res = await request(app).get(url);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a('array');
    expect(res.body).to.have.property("success", true);
  });
});

describe('GET /movie/:id/characters', () => {
  describe('passing non-existing id as parameter', () => {
    it('should return an error', async () => {
      const url = '/movie/12345/characters';
      const res = await request(app).get(url);

      expect(res.status).to.equal(422);
      expect(res.body).to.have.property("success", false);
    });
  });

  describe('passing a valid id as parameter', () => {
    it('should get list of characters for the movie', async () => {
      const url = '/movie/5/characters';
      const res = await request(app).get(url);

      expect(res.status).to.equal(200);
      expect(res.body.data.result).to.be.a('array');
      expect(res.body).to.have.property("success", true);
    });
  });
});

describe('GET /movie/:id/comments', () => {
  describe('passing non-existing id as parameter', () => {
    it('should return an error', async () => {
      const url = '/movie/12345/comments';
      const res = await request(app).get(url);

      expect(res.status).to.equal(422);
      expect(res.body).to.have.property("success", false);
    });
  });

  describe('passing a valid id as parameter', () => {
    it('should get list of comments for the movie', async () => {
      const url = '/movie/5/comments';
      const res = await request(app).get(url);

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a('array');
      expect(res.body).to.have.property("success", true);
    });
  });
});
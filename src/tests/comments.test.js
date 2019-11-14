import request from 'supertest';
import chai  from 'chai';
import app from '../'

const expect = chai.expect;

describe('POST /comment', () => {
  describe('passing empty payload', () => {
    it('should return a validation error', async () => {
      const url = '/comment';
      const payload = {}
      const res = await request(app)
        .post(url)
        .send(payload)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("success", false);
    });
  });

  describe('passing non-existing movieId in the payload', () => {
    it('should return a validation error', async () => {
      const url = '/comment';
      const payload = {
        movieId: 12345,
        comment: 'yeah, the best one so far!'
      }
      const res = await request(app)
        .post(url)
        .send(payload)
        .set('Accept', 'application/json');
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("success", false);
    });
  });

  describe('passing in proper payload data', () => {
    it('should make a comment post', async () => {
      const url = '/comment';
      const payload = {
        movieId: 5,
        comment: 'yeah, the best one so far!'
      }
      const res = await request(app)
        .post(url)
        .send(payload)
        .set('Accept', 'application/json');
  
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("success", true);
    });
  });
});
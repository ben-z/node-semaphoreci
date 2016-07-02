import assert from 'assert'
import SemaphoreAPI from '../lib'

const api = new SemaphoreAPI({
  api_url: 'http://semaphoreci.test/api/v1',
  api_hash: 'some_hash',
  auth_token: 'some_token'
})


describe('Semaphore API', () => {
  describe('_buildRequest', () => {
    it('builds a URL with no query parameters', () => {
      const expected_url = `${api.api_url}/some/path?auth_token=${api.auth_token}`;
      const built_url = api._buildRequest('/some/path');
      assert.equal(built_url, expected_url);
    });

    it('builds a URL with 2 query parameters', () => {
      const query = {
        unicorns: 1,
        page: 2
      };
      const query_string = `&unicorns=1&page=2`;
      const expected_url = `${api.api_url}/some/path?auth_token=${api.auth_token}${query_string}`;
      const built_url = api._buildRequest('/some/path', query);
      assert.equal(built_url, expected_url);
    });
  });
});

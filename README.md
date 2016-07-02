# node-semaphoreci

[![Build Status](https://travis-ci.org/ben-z/node-semaphoreci.svg?branch=master)](https://travis-ci.org/ben-z/node-semaphoreci)

Simple Javascript wrapper for Semaphore CI's [API](https://semaphoreci.com/docs/api.html)

### Examples

```js
import SemaphoreCI from 'node-semaphoreci'

const api = new SemaphoreCI({
  api_url: 'http://semaphoreci.com/api/v1',
  api_hash: 'some_hash',
  auth_token: 'some_token'
})

api.getBranches().then(response => {
  const branches = response.data;
  
  // ...
}).catch(err => {
  console.log(err);
});
```

### Useful Links

- [Semaphore CI API documentation](https://semaphoreci.com/docs/api.html)
- [Corresponding Javascript Methods](src/index.js)

### Testing

```
$ npm install
$ npm test
```

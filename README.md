# Tech with Tim - Notes App Django/React Tutorial

## Learned

- Setting "\*" for ALLOWED_HOSTS will allow you to avoid the disallowed host error
  - Allowing all hosts and all CORS origins is not secure, but it removes roadblocks for test apps
- JWT - JSON web tokens
  - They act as the permissions/authentication every time you access a website
  - The frontend user sends a token along with their request so the backend knows who the user is and what permissions they have
  - 2 tokens - access token and refresh token
    - Access token is used with all requests, and refresh token is used to refresh the access token
    - Frontend stores both access and refresh tokens, to continue to use them with future requests without constantly signing in to the app
    - Expire access token relatively quickly. After refresh token expires, you need to sign into the webpage again, to get a new set of tokens
    - So the length of the access token is always shorter than the length of the refresh token
- ORM - Object relational mapping
    - Write normal code, and Python/Django handles converting that into all the database operations that need to be performed
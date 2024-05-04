# Tech with Tim - Notes App Django/React Tutorial

## Learned

- Backend

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
  - Serializers
    - They take data that exists on the server and convert it into a form that can be read by other technologies (JSON)
    - It also packages data that gets sent to the server and bundles it in a way that can be read by the server and saved to the database

- Frontend
  - It's possible to store things on local storage in the browser, and then create keys to access that
  - Axios is a helpful way to send network requests. Analogy - Axios is the waiter in a restaurant, the React app is the patron, the server is the kitchen
  - Axios interceptors
    - Imagine between the waiter (Axios) and the kitchen (server), there's another middleman called The Inspector. He checks the orders that come in from restaurant patrons to make sure it's correct. He can modify it or even decide not to send it to the kitchen. This is the request interceptor. Then he can check food that comes from the kitchen and make sure it's prepared exactly according to your request before it gets sent to the patron. This is the response interceptor
    - So in general, interceptors act as quality control, to enhance/adjust the data flow between client and server and make sure everything is in order before/after the server processes the request
    - In our case, the interceptor takes any request we send in and automatically adds in the right headers, so we don't need to manually write out that logic multiple times throughout our code. So the interceptor checks if we have the access token, and if we do, then it'll add it to the request headers so we don't need to think about access tokens anymore

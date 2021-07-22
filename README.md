# iFrame-Mercemur

# Server

To run locally, clone the repo.
Run <code>npm install</code>
Then <code>yarn start</code>

## Features

### Users can register and login with email and password. (POST request)

POST http://localhost:5000/user/register
JSON Body {email: "ben003@ben.com", password: "ben003"}
Returns {user, token}

POST http://localhost:5000/user/login
JSON Body {email: "ben003@ben.com", password: "ben003"}
Returns {user, token}

### Create an iframe by passing authorization in the header.

POST http://localhost:5000/iframes/
Key: authorization
Value: Bearer token
(The token returned from login)
Writes data to MongoDB and returns the URL and ID.


### Get frame by id. Implements shared link.

GET http://localhost:5000/iframes/:id
Key: authorization
Value: Bearer token
(The token returned from login. ID returned from createFrame)
Writes data to MongoDB and returns the URL.


### Get a list of URL used by the user.

GET http://localhost:5000/user/history
Key: authorization
Value: Bearer token
Reads user data from MongoDB and returns URL list.

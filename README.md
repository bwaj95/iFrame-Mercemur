# iFrame-Mercemur

# Server

To run locally, clone the repo.
Run <code>npm install</code>
Then <code>yarn start</code>

## Features

### Users can register and login with email and password. (POST request)

POST http://localhost:5000/user/register <br>
JSON Body {email: "ben003@ben.com", password: "ben003"} <br>
Returns {user, token} <br>

POST http://localhost:5000/user/login <br>
JSON Body {email: "ben003@ben.com", password: "ben003"} <br>
Returns {user, token} <br>

### Create an iframe by passing authorization in the header.

POST http://localhost:5000/iframes/  <br>
Key: authorization <br>
Value: Bearer token <br>
(The token returned from login) <br>
Writes data to MongoDB and returns the URL and ID. <br>


### Get frame by id. Implements shared link.

GET http://localhost:5000/iframes/:id  <br>
Key: authorization <br>
Value: Bearer token <br>
(The token returned from login. ID returned from createFrame) <br>
Writes data to MongoDB and returns the URL. <br>


### Get a list of URL used by the user.

GET http://localhost:5000/user/history  <br>
Key: authorization <br>
Value: Bearer token <br>
Reads user data from MongoDB and returns URL list. <br>

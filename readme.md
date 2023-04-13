Hi, This is my test project (Backend Test Assignment - Reunion)

I have created the dockerfile and image

okay so to run tests, use the command as follow

         'docker-compose run test' OR 'docker compose run test'

and to run the development server, run the command as follow
'docker-compose run app' OR 'docker compose run app'

Endpoints:

1. '/api/authenticate/sign-in' (POST) //endpoint to login
2. '/api/authenticate/register' (POST) //endpoint to register
3. '/api/authenticate/logout' (DELETE) //endpoint to logout
4. '/api/posts' (POST) //endpoint to create a post
5. '/api/posts' (GET) //endpoint to get all posts (following the criterias you mentioned)
6. '/api/posts/:id' (DELETE) //endpont to delete a post
7. '/api/posts/:id' (GET) //endpoint to fetch a single post
8. '/api/like/:id' (POST) //endpont to like a post and <id> is post's id
9. '/api/unlike/:id' (POST) //endpont to unlike a post and <id> is post's id
10. '/api/follow/:id' (POST) //endpont to follow a user and <id> is user's id to follow
11. '/api/unfollow/:id' (POST) //endpont to unfollow a user and <id> is user's id to unfollow
12. '/api/comment/:id' (POST) //endpont to comment a post and <id> is post's id
13. '/api/user' (GET) //endpoint to get current user's info

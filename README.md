# Blog Project (Server)

This repo contains the Backend for The Odin Project blog project.

This is a jamstack project (frontend and backend in separate repos). The links to the other repos are provided below:
- [Public site](https://github.com/jasonHYLam/TOP-Blog-Api-Client)
- [Admin site](https://github.com/jasonHYLam/TOP-Blog-API-Admin)

## What I've Learned

This is my first attempt at creating a Jamstack project, and as such I've learned a lot:

- RESTful API organisation.
- Communication between frontend and backend.
- Authentication and authorization using JSON Web Tokens (JWTs), as an alternative to using sessions.
- Using the JWT package to sign the JWT and add it to the cookie, and verification. 
- Using `httpOnly` cookies for safe authentication requests, rather than localStorage which is vulnerable to XSS attacks.
- Rolling out manual authentication and authorization, rather than using authentication middleware such as PassportJS.
- Obtaining cookies from the request header for authentication/authorization.
- Making multiple fetch requests from the same frontend route, by creating multiple backend API routes.
- Consolidating understanding and usage of middlewares.
- CORS, allowing access to backend from frontend, and allowing requests from multiple origins.
- Testing backend routes using Postman.

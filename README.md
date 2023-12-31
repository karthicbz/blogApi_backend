# Blog-Api (Backend)

Welcome to the darkside of the project. This backend code follows a MVC pattern which is
* Model - `mongodb` is used to make schemas and models.
* View - `ejs` is used to render the views.
* Controller - `express` is used as a controller.

I have used the module called [trix](https://github.com/basecamp/trix) for rich text editor which is based on `WYSIWYG` editor.

live link to [blog-backend](https://blogapi-1ei1.onrender.com)<br>
live link to [blog-frontend](https://karthicbz.github.io/blog-frontend/)

## Features
* User can make a post using rich text editor.
* User can edit the posts
* User can delete the posts
* User can view the comments for the posts
* User can delete the comments, which actually update the comment as `[removed my admin]` and saves the deleted comment into other collection.
* User can filter comments based on commenters

## Build with
[![My Skills](https://skillicons.dev/icons?i=js,html,css,express,mongodb,nodejs,postman,git)](https://skillicons.dev)

## How to compile this project
* Download or clone this repo into your local machine
* `cd` into the project's folder
* Type `npm install` to install the necessary modules
* Type `npm run serverstart` to run compile and run the project

## Screenshot
### Loginpage
![Secrrenshot of a login page](/assets/Screenshot%20from%202023-06-28%2011-40-25.png)

### Page shows all posts
![screen of a page shows all posts](/assets/Screenshot%20from%202023-06-28%2011-40-45.png)

### Page to create a new post
![screenshot of a page use to create a new post](/assets/Screenshot%20from%202023-06-28%2011-41-01.png)

### Page shows a detail of post
![screenshot of a page shows a detail of a post](/assets/Screenshot%20from%202023-06-28%2011-41-20.png)

### Page shows a list of comments for the post
![screenshot shows a list of comments for the post](/assets//Screenshot%20from%202023-06-28%2011-42-17.png)

### page shows a comments filtered by username
![screenshot shows a list of comments filtered by username](/assets/Screenshot%20from%202023-06-28%2013-10-59.png)

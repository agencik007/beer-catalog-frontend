# Author information
Hello and welcome to my very first big project.
You can check it out on [World of beers](https://beercatalog.networkmanager.pl/) website. 

I divided the project into
[Frontend](https://github.com/agencik007/beer-catalog-frontend) and
[Backend](https://github.com/agencik007/beer-catalog-backend)
Is not finished due to the limited amount of time (one month). Due to lack of time, I did not type everything properly in typescript, which is why you often see @ts-ignore and any type in code. In the future, I will be fixing it and adding new functionalities such as:
- waiting room
- comments
- rating system
- admin panel
- searching
- editing beers

Right now you can:
- see all beers added by registered users
- create your own account stored in MongoDB database and secured by password hashing
- create, delete your favourite bear
- use pagination

# Configuration
To run this project on your computer you need to follow these steps:
1. Create a database in MongoDB and a beer-catalog collection where users and beers will be recorded. It is simple 
   to do, you can use the online version of MongoDB Atlas without installing any software. It should looks like this: <a href="https://imgbb.com/"><img src="https://i.ibb.co/0hmyvfh/mongodb-collection.png" alt="mongodb-collection" border="0"></a>
2. Set the file .env in backend folder and type your credentials. 

   NODE_ENV = development

   MONGO_URI = PUT YOUR CONNECTION URI TO MONGODB

   ADMIN_EMAIL = TYPE YOUR EMAIL

   JWT_SECRET = TYPE YOUR SECRET CODE
   
   PORT = 5000
   
3. MongoDB URI is stored in your MongoDB connect tab. You can also specify 'beer-catalog' collection like this: 
   'mongodb+srv://admin:password@cluster0.deo9b.mongodb.net/beer-catalog?retryWrites=true&w=majority'
   <a href="https://ibb.co/4p94yBp"><img src="https://i.ibb.co/njZQ2hj/mongo-uri.png" alt="mongo-uri" border="0"></a> 
4. Add ADMIN_EMAIL and you will be able to create Admin account with permission to delete all beer records.
5. Set a strong password in the JWT_SECRET field.
6. In frontend folder you have to check tsconfig.paths.json file and type correct directory for types in backend 
   folder. 

Thats all. You can see how it works by run backend with start:dev script and frontend with start script. Enjoy :)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

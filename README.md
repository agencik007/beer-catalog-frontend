# Author information

Hello and welcome to my very first big project.
You can check it out on [World of beers](https://beercatalog.networkmanager.pl/) website.

I divided the project into:

-   [Frontend](https://github.com/agencik007/beer-catalog-frontend)
-   [Backend](https://github.com/agencik007/beer-catalog-backend)

## Tech

-   [Typescript]
-   [React]
-   [Redux-tooltkit]
-   [Express.js]
-   [MongoDB]
-   [Mongoose]
-   [Better Auth]
-   [Axios]

## Info

In the future, I will be fixing bugs and adding new functionalities such as:

-   waiting room for admin acceptation
-   comments
-   rating system for all users
-   admin panel
-   searching
-   editing beers

Right now you can:

-   see all beers added by registered users
-   create your own account (email verification required), reset a forgotten password, or sign in with Google/GitHub
-   create beer with properties: name, type, rating, description, percentage of alcohol in beer, address with png image
-   delete your beer from page and database
-   use pagination

## Configuration

To run this project on your computer you need to follow these steps:

1. Create a database in MongoDB and a beer-catalog collection where users and beers will be recorded. It is simple
   to do, you can use the online version of MongoDB Atlas without installing any software. It should looks like this: <a href="https://imgbb.com/"><img src="https://i.ibb.co/0hmyvfh/mongodb-collection.png" alt="mongodb-collection" border="0"></a>
2. Configure the backend `.env` as described in the backend README / `.env.example` (`MONGO_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, optional `BREVO_API_KEY` + `EMAIL_FROM_ADDRESS` and OAuth keys).
3. MongoDB URI is stored in your MongoDB connect tab. You can also specify 'beer-catalog' collection like this:
   'mongodb+srv://admin:password@cluster0.deo9b.mongodb.net/beer-catalog?retryWrites=true&w=majority'
   <a href="https://ibb.co/4p94yBp"><img src="https://i.ibb.co/njZQ2hj/mongo-uri.png" alt="mongo-uri" border="0"></a>
4. Grant the admin role (permission to delete all beer records) with `npm run set-admin -- <email>` in the backend.
5. Without `BREVO_API_KEY` the backend prints verification and reset links to its console in development.
6. Shared entity types live in `src/types` (import them as `types`). The frontend builds on its own; a checkout of beer-catalog-backend is not required.

Thats all. You can see how it works by run backend with start:dev script and frontend with start script. Enjoy :)

## CI / CD

- `.github/workflows/ci.yml` runs on pull requests and pushes to `main`: Node 22, `npm ci`, `npm run build`, with `VITE_API_URL=https://beer-catalog-backend.onrender.com`.
- `.github/workflows/deploy.yml` deploys to Vercel production on push to `main`. Add these repository secrets (do not commit a token):
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID` = `team_peqVqe2v79Og4AILzWMz0edy`
  - `VERCEL_PROJECT_ID` = `prj_DonHoMF33KkFQI4eiuZdhjycMElh`

## Environment

- Set `VITE_API_URL` to your backend base URL (e.g. `https://your-render-api.example.com`).  
  If not set, the app falls back to `http://localhost:5000` for local development.
  On Vercel, add this variable in Project Settings → Environment Variables.
- Set `VITE_AUTH_PROVIDERS` to a comma-separated list of OAuth providers enabled on the backend (`google`, `github`) to show their sign-in buttons. Leave it empty to hide them.
- See `.env.example`.

## Authentication

Authentication uses [Better Auth](https://www.better-auth.com) (`src/lib/authClient.ts`). After sign-in the session token is stored in `localStorage` (`user.token`) and sent as `Authorization: Bearer <token>` to the API.

- `/register`: creates the account and sends a verification email; the link lands on `/auth/callback`, which signs the user in.
- `/login`: email + password, optional Google/GitHub buttons (OAuth also returns to `/auth/callback`).
- `/forgot-password` and `/reset-password`: password reset by email.

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

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
The primary audience is portfolio viewers: recruiters, peers and friends of the author. They open the live site (beercatalog.networkmanager.pl) to judge the author's frontend and full-stack skill. A smaller group of registered users adds and browses beers.

## Product Purpose
"World of beers" is a community beer catalog. Visitors browse beers that registered users have added. Signed-in users add their own beers and delete them. Success means a visitor quickly sees a well-made, working product: clear browsing, solid auth and careful detail.

## Positioning
This is the author's first large full-stack project, built with React, Redux Toolkit, Express, MongoDB and Better Auth. It shows a complete product loop end to end: verified accounts, OAuth, CRUD with ownership and admin roles, and pagination.

## Operating Context
- Visitors browse on desktop and mobile.
- Recruiters usually look briefly and often without signing in, so the logged-out catalog is the main surface.
- The frontend is deployed on Vercel. The backend runs separately (Render), and its first request can be slow on a cold start.

## Capabilities and Constraints
- **Routes:**
  - catalog list with pagination (`/`)
  - beer detail (`/beer/:id`)
  - the user's own beers (`/user`)
  - create beer (`/create`)
  - login and register
  - forgot and reset password
  - auth callback
- **Beer fields:**
  - name and type (IPA, APA, Lager, Pilsner, Stout beer, Porter, Wheat, Sour)
  - star rating set by the creator (0–5)
  - description (max 200 characters)
  - alcohol %
  - image URL (PNG); a fallback image is used when the URL is empty
  - created date and author
- **Roles:** an owner deletes their own beers; an admin deletes any beer.
- **Auth:** email with verification, password reset, Google and GitHub sign-in when they are configured.
- **Multilingual:** the UI will become multilingual (it is English today). Layouts must tolerate longer translated strings, and fonts must cover Polish and other Latin-extended characters. An i18n library is not chosen yet.
- **Planned, not built:** admin approval queue, comments, ratings by all users, admin panel, search, editing beers.
- **Stack:**
  - React 18 + TypeScript + Vite, Redux Toolkit, react-router 6
  - plain global CSS
  - react-icons, react-simple-star-rating, react-toastify

## Evidence on Hand
- The beers are real user-submitted entries from the API.
- Fallback image: `src/assets/images/beer.png`.
- There are no testimonials, user counts or statistics. Do not invent any.

## Product Principles
- The catalog is the showcase: browsing without an account must look and work at its best.
- Show the work end to end. States like loading, empty, error, not found and cold-start delays are designed, not left to chance.
- Content belongs to the users. Present user-submitted names, images and descriptions well, even when they are uneven in quality.
- Build for more than one language from the start.

## Accessibility & Inclusion
Keep the existing `prefers-reduced-motion` support. Text must meet WCAG AA contrast, and keyboard focus must stay visible.

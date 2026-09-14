# Wanderlust

A full-stack travel and accommodation platform inspired by modern vacation rental applications. Users can explore listings, search destinations, apply filters, view property locations on interactive maps, create and manage listings, and leave reviews.

## Features

* User registration and login
* Google Authentication
* Session-based authentication and authorization
* Create, edit, and delete accommodation listings
* Search listings by destination
* Filter listings by price and location
* Browse listings by categories and popular destinations
* Interactive maps using MapTiler
* Add and manage reviews
* Image upload and cloud storage using Cloudinary
* Protected routes and authorization middleware
* Form validation and error handling
* Responsive user interface

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Services

* Passport.js
* Google OAuth
* Express Session
* Connect-Mongo
* Cloudinary
* MapTiler
* Joi

## Architecture

The application follows the **MVC (Model-View-Controller)** architecture.

```text
User
  ↓
EJS / Frontend
  ↓
Express Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Mongoose
  ↓
MongoDB
```

## Search & Filtering

Wanderlust provides a listing discovery system that allows users to:

* Search for destinations
* Filter by minimum and maximum price
* Filter by location
* Browse listings by category
* Combine search and filters to find suitable accommodations

## Installation

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Wanderlust
npm install
node app.js
```

The application runs locally at:

```text
http://localhost:8080
```

## Key Concepts

* MVC Architecture
* RESTful Routing
* CRUD Operations
* MongoDB & Mongoose
* Google OAuth Authentication
* Authorization & Session Management
* Express Middleware
* Search & Filtering
* Form Validation
* Cloudinary Image Storage
* MapTiler Interactive Maps
* Git & GitHub

## Future Improvements

* Online payment integration
* Email notifications
* AI-powered travel recommendations
* Listing and user analytics
* Performance and caching improvements

## Live Demo

[Wanderlust](https://wanderlust-6v3v.onrender.com/listings)

## Author

**Sanjana Chetry**

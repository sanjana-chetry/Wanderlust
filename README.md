# Wanderlust

A full-stack travel and accommodation platform that allows users to discover, create, manage, and review property listings.

## Overview

Wanderlust is a full-stack web application inspired by modern travel and accommodation platforms. The application allows users to explore accommodation listings, view detailed property information, create and manage their own listings, and share reviews.

The project focuses on implementing real-world backend concepts including authentication, authorization, RESTful routing, database relationships, CRUD operations, validation, and cloud-based image storage.

## Features

* User registration, login, and logout
* Authentication and authorization
* Create accommodation listings
* Browse available listings
* View detailed listing information
* Edit and update listings
* Delete listings
* Add and manage reviews
* Image upload and cloud storage
* Protected routes
* Authorization middleware
* Form validation
* Responsive user interface
* Error handling and custom middleware

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

### Authentication and Services

* Passport.js
* Express Session
* Connect-Mongo
* Cloudinary
* Joi

## Architecture

The application follows the Model-View-Controller (MVC) architecture.

```text
Wanderlust
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── middleware/
├── init/
├── app.js
└── package.json
```

### Application Flow

```text
User
  │
  ▼
Frontend / EJS
  │
  ▼
Express Routes
  │
  ▼
Middleware
  │
  ▼
Controllers
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

## Authentication and Authorization

Wanderlust uses session-based authentication to manage authenticated users.

Users can register and log in before accessing protected functionality.

Authorization middleware ensures that users can only modify or delete resources that they own.

## Database

MongoDB is used as the primary database, with Mongoose providing schema definition and database interaction.

### User

Stores information about registered users.

### Listing

Stores accommodation information such as:

* Title
* Description
* Price
* Location
* Country
* Image
* Owner

### Review

Stores reviews associated with listings and users.

## Image Storage

Listing images are uploaded to Cloudinary rather than being stored directly on the application server.

The resulting image URL and metadata are stored in MongoDB and retrieved when the listing is displayed.

## Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project directory

```bash
cd Wanderlust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

The application will run locally at:

```text
http://localhost:8080
```

## Key Concepts Implemented

* MVC architecture
* RESTful routing
* CRUD operations
* MongoDB data modeling
* Mongoose relationships
* Authentication
* Authorization
* Session management
* Express middleware
* Form validation
* Error handling
* Cloud-based image storage
* Git and GitHub workflow

## Future Improvements

* Interactive maps for listing locations
* Advanced search and filtering
* Wishlist functionality
* Online payment integration
* Email notifications
* AI-powered travel recommendations
* Listing and user analytics
* Improved caching and application performance

## Author

Sanjana Chetry

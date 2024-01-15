
# MERN MArketPulse Learning Project

## Overview
This MERN (MongoDB, Express.js, JavaScript, React, Node.js) stack application is a tiny e-com application, designed as a learning project during for PerScholas bootcamp program to enhance my software engineering skills by addressing various full-stack development challenges. It was chosen specifically to encounter and solve common software development problems in a practical context.

## Goals, Structure & Developemnt Process
Building a project that cumulatively encompasses various aspects of software engineering, from database management to frontend development.
The development process is organized in a workflow approach that incrementally builds both the client and server sides. The client-side part of this project is divided into two main phases:

Phase 1: Vanilla JavaScript Implementation 
Initially, the application's functionalities are implemented using Vanilla JavaScript.

Phase 2: Transition to React
In the final weeks of the bootcamp, the client-side codebase will be transitioned from Vanilla JavaScript to React. This shift is aimed at enhancing my React and Redux skills.

## Repository Structure
Two Separate Repositories: Initially, the project will have two separate repositories:
Client Repository: For the frontend development. 
Server Repository: For the backend development.
Unified Repository Post-transition: After the transition to React, the project will be consolidated into a single repository hosting both the server and client codebases, preparing it for deployment.

## Installation and Setup Instructions
### Cloning the Repositories
Clone both the client and server repositories from GitHub.
client: https://github.com/besioini/market-pulse-client
server: https://github.com/besioini/market-pulse-server
### Dependency Installation
Navigate to each repo directory in two separate terminals and run:
```bash
npm install
```
This command will install all necessary dependencies for each part of the project.

## Usage
### Running the Server
- Ensure you have the latest version of Node.js installed.
- Navigate to the server directory and run:
```bash
npm run dev
```
This will start the Express server.

### Running the Client
- Navigate to the client directory and run:
```bash
npm start
```
This will launch the client-side application.

## Technology Stack
### Server
- Framework: Express.js
- Database: MongoDB
- Libraries: CORS, Nodemon, Bcrypt, JWT

### Client
- JavaScript: Vanilla JS
- Styling: Plain CSS
- Libraries: Opener npm

## Features
- **User Registration and Authentication**: Secure user registration and login functionality, with password encryption and JWT for session management.
- **Product Browsing and Search**: Users can browse, search, and filter products.
- **Shopping Cart Management**: Adding products to the cart, modifying quantities, and saving items for later.
- **Checkout Process**: Including shipping information entry, payment processing, and order review.
- **Order Confirmation and Tracking**: Users receive detailed confirmation and can track their orders.
- **User Account Management**: Profile updates, password changes, and order history viewing.
- **Seller Interface**: For product listing and order management 
- **Responsive Design**: Ensuring a seamless user experience across various devices.



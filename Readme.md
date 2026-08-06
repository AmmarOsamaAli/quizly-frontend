# Project Name
### Quizly
## Overview
The **React frontend** for a real-time, multiplayer Kahoot-style quiz game. Handles the host dashboard, quiz creation UI, live game screens, and player join/gameplay experience.
 
This client communicates with a separate backend service that exposes:
- a **REST API** (Node + Express + JWT) for authentication, quiz CRUD, and stored game reports
- a **Socket.io server** for real-time game state — question broadcasts, timers, live answers, and leaderboard updates
## Screenshots

## Technologies Used
**React**, **Socket.io**
## Getting Started

## Frontend Installation
 
Follow these steps to set up and run the React frontend locally.
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- The backend API and Socket.io server running (see the [backend repo](https://github.com/AmmarOsamaAli/quizly-backend))
### Steps
 
1. **Create a folder for your project and cd into it**
```bash
   mkdir quizly-frontend
   cd quizly-frontend
```
 
2. **Perform the following commands in the command line**
```bash
   git clone git@github.com:AmmarOsamaAli/quizly-frontend.git
   rm -rf .git
   rm README.md
```
 
3. **Create a `.env` file with the following values**
```env
   VITE_BACK_END_SERVER_URL=http://localhost:3000
```
 
4. **run:**
```bash
   npm i
```
 
5. **run:**
```bash
   npm run dev
```
 
   The app should now be running at `http://localhost:5173`.
 
---



## User Stories
**Authentication** 
1. **As a guest**, I want to create an account so II can create and join quizzez.
2. **As a user**, I want to sign in so I can access my quizzes.
3. **As a user**, I want to sign out so my account remains secure.

**Quiz creation**

4. **As a user**, I want to create a quiz so I can host a live game.
5. **As a quiz owner**, I want to edit my quiz information.
6. **As a quiz owner**, I want to delete a quiz I no longer need.
7. **As a quiz owner**, I want to add questions to my quiz.
8. **As a quiz owner**, I want to edit or remove questions.
9. **As a quiz owner**, I want to preview my quiz before hosting it.

**Hosting**

10. **As a quiz owner**, I want to create a live room.
11. **As a host**, I want to see players join in real time.
12. **As a host**, I want to start the game.
13. **As a host**, I want to control when questions begin and end.
14. **As a host**, I want to display results and leaderboards.
15. **As a host**, I want to end the session.

**Playing**

16. **As a player**, I want to join using a room code.
17. **As a player**, I want to see questions when the host starts them.
18. **As a player**, I want to submit one answer.
19. **As a player**, I want to know whether my answer was correct.
20. **As a player**, I want to see my score and rank.
21. **As a player**, I want to see the final result.


## Database Design





## Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | / | Home page |
| GET | /listings | List all listings |
| GET | /listings/new | New listing form |
| POST | /listings | Create listing |
| GET | /listings/:id | View listing |
| GET | /listings/:id/edit | Edit listing form |
| PUT | /listings/:id | Update listing |
| DELETE | /listings/:id | Delete listing |





## Features





## Future Enhancements





## Credits
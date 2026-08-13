# Project Name

### **Quizly | Create Quizzes, Join Games, and Compete with Friends**

## Overview

Quizly is a real-time multiplayer quiz platform. It allows users to create and manage quizzes, host live game sessions, and invite other players to join using a unique room code.

During a live game, players receive questions simultaneously, submit their answers, earn points, and compete on an automatically updated leaderboard. The application combines full CRUD functionality, JWT-based authentication, user authorization, RESTful APIs, and real-time communication to create an interactive quiz experience suitable for classrooms, training sessions, events, and friendly competitions.

## Screenshots

## Technologies Used

- **React**
- **Socket.io**

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
1. **As a guest**, I want to create an account so I can create and join quizzez.
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
13. **As a host**, I want to display results and leaderboards.
14. **As a host**, I want to end the session.

**Playing**

15. **As a player**, I want to join using a room code.
16. **As a player**, I want to see questions when the host starts them.
17. **As a player**, I want to submit one answer.
18. **As a player**, I want to know whether my answer was correct.
19. **As a player**, I want to see my score and rank.
20. **As a player**, I want to see the final result.



## Routes

#### User

|    Page    |    URI   |      Use Case     |
|:----------:|:--------:|:-----------------:|
| SignUpPage | /sign-up | Show Sign Up Page |
| SignInPage | /sign-in | Show Sign In Page |

#### General

|    Page   |     URI    |       Use Case      |
|:---------:|:----------:|:-------------------:|
|  Homepage |      /     |    Show Homepage    |
| Dashboard | /dashboard |    Show Dashboard   |

#### Quiz 

|       Page      |          URI          |      Use Case     |
|:---------------:|:---------------------:|:-----------------:|
|  AllQuizzesPage |        /quizzes       |  Show All Quizzes |
|  MyQuizzesPage  |  /quizzes/my-quizzes  |  Show My Quizzes  |
| QuizDetailsPage |    /quizzes/:quizId   | Show Quiz Details |
|  CreateQuizPage |    /quizzes/create    |  Create Quiz Page |
|   EditQuizPage  | /quizzes/:quizId/edit |   Edit Quiz Page  |

### Questions

|       Page       |                     URI                     |       Use Case      |
|:----------------:|:-------------------------------------------:|:-------------------:|
|  AddQuestionPage |        /quizzes/:quizId/questions/add       |  Add Question Page  |
| EditQuestionPage | /quizzes/:quizId/questions/:questionId/edit | Edit Questions Page |

#### Game

|         Page        |           URI          |              Use Case             |
|:-------------------:|:----------------------:|:---------------------------------:|
|     JoinGamePage    |       /games/join      |        Show Join Game Page        |
| ParticipantGamePage |   /games/:gameId/play  | Show Gameplay Page as Participant |
|     HostGamePage    |   /games/:gameId/host  |     Show Gameplay Page as Host    |
|   GameResultsPage   | /games/:gameId/results |         Show Results Page         |



## Features

- User authentication and protected routes
- Create, edit, delete, and manage quizzes
- Add, edit, and delete quiz questions
- Public and private quizzes
- Real-time multiplayer games with 6-digit join codes
- Live synchronized questions using Socket.IO
- Timed questions with speed-based scoring
- Automatic question progression and answer reveal
- Live player lobby and final leaderboard
- Quiz ownership and backend authorization

## Future Enhancements

- Host controls for manually skipping or pausing questions
- More quiz customization, such as images and different question types
- Game history and player statistics
- Search, filtering, and quiz categories improvements
- Reconnecting players more reliably after connection loss
- Responsive mobile optimization
- Improved game security and production-ready persistent timers

## Credits

- Mr. Omar Kamal (https://github.com/omarakamal)
- Mr. Zaid (https://github.com/justzaid)
- Mrs. Israa Ashoor (https://github.com/ISRAA-ASHOOR)
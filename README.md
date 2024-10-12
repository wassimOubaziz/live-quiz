# AI Quiz Application Front-end / Back-end will be published soon or contact me

## Overview

The AI Quiz Application is a web-based platform that allows users to generate quizzes using AI technology. Users can enter prompts to create quizzes, which can then be sent to a database for storage. The application is built using Next.js, Express.js, MongoDB, and integrates AI to dynamically generate quiz content based on user input.

## Features

- **AI-Generated Quizzes:** Users can input prompts to generate quizzes with questions and options.
- **User Authentication:** Secure access with token-based authentication.
- **Database Integration:** Store quizzes in MongoDB for persistent storage.
- **User-Friendly Interface:** Intuitive UI for easy interaction and quiz management.

## Technologies Used

- **Frontend:**
  - Next.js: React framework for server-rendered applications.
  - Tailwind CSS: Utility-first CSS framework for styling.
  - Axios: Promise-based HTTP client for making API requests.

- **Backend:**
  - Express.js: Web framework for building RESTful APIs.
  - MongoDB: NoSQL database for storing quiz data.
  - Mongoose: ODM for MongoDB to define schemas and models.
  - Groq SDK: For generating quizzes using AI.

## Installation

To get started with the application, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Clone the Repository

```bash
git clone <repository-url>
cd ai-quiz-app
```

### Install Dependencies

For both frontend and backend:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of your project and add the following variables:

```
MONGODB_URI=<your-mongodb-connection-string>
```

### Start the Application

1. **Start the Backend Server**

   In the backend directory (e.g., `backend`):

   ```bash
   node server.js
   ```

2. **Start the Frontend Development Server**

   In the frontend directory (e.g., `frontend`):

   ```bash
   npm run dev
   ```

Your application will be available at `http://localhost:3000`.

## Usage

1. **Create a Quiz:**
   * Enter a prompt for the quiz in the input field and click the "Generate Quiz" button.
   * View the generated quiz with questions and options.

2. **Save to Database:**
   * Toggle the option to save the quiz to the database. If enabled, click the button to send the quiz to the database.

## API Endpoints

* `POST /api/quizzes`: Generates and saves a quiz based on user input.
   * **Request Body:**
      * `userInput`: The prompt for generating the quiz.
      * `userId`: The ID of the user creating the quiz.
      * `token`: Authentication token.
      * `isQuiz`: Boolean indicating if the input is for a quiz.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* Next.js
* MongoDB
* Tailwind CSS

---

### Customization Tips:
1. **Repository URL:** Replace `https://github.com/wassimOubaziz/live-ai-quiz/` with the actual URL of your GitHub or code repository.

contact linkedin url: https://www.linkedin.com/in/wassim-oubaziz/

Feel free to adapt this template to better match your project's goals and features!

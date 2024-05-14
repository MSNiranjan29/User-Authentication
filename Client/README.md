MERN Stack Project

Introduction
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project that serves as a boilerplate/template for building full-stack web applications.

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your local machine. You can download and install it from Node.js official website.
MongoDB installed and running on your local machine. You can download and install it from MongoDB official website.
Text editor or IDE of your choice. Recommended editors include Visual Studio Code, Sublime Text, or Atom.
Setting Up the IDE
To set up your IDE for this project, follow these steps:

Open your preferred IDE.
Clone this repository to your local machine using:

git clone <repository_url>
Open the cloned project folder in your IDE.
Installation
To install necessary dependencies, follow these steps:

Navigate to the project root directory in your terminal.
Run the following command to install backend dependencies:

cd Server
npm install
Run the following command to install frontend dependencies:

cd Client
npm install
Configuration
Before running the application, you need to configure the backend and frontend settings.

Backend Configuration
Create a .env file in the backend directory.
Add the following variables to the .env file:
makefile

PORT=3001
MONGODB_URI=<your_mongodb_connection_string>

Frontend Configuration
create a react app using command:
npx create-react-app Client

Running the Application
To run the application, follow these steps:

Ensure MongoDB is running on your local machine.
Navigate to the project root directory in your terminal.
Start the backend server by running the following command:

cd Server
node server.mjs

Open a new terminal window/tab.
Navigate to the project root directory again.
Start the frontend server by running the following command:

cd Client
npm start
Open your web browser and go to http://localhost:3000 to view the application.

Additional Information
The backend server runs on port 5000 by default. You can change this port by modifying the PORT variable in the .env file.
Make sure your MongoDB connection string is correctly configured in the .env file to ensure proper database connectivity.
For more information on how to customize and extend this project, refer to the project documentation or contact the project maintainers.

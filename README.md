
# Setting Up Backend

This Readme file contains the backend installation setup for the Dorm-Deals Application.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)

- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Installation
1. Fork the repository 
2. Clone the repository :
```bash

git clone https://github.com/your-username/mern-app-backend.git

```
3. Navigate to the backend directory :
```bash

cd server

```
4. Install dependencies :
```bash

npm install

```
5. Set up the environment variables :
Create a `.env` file in the root directory and add the following variables:

```env

MONGODB_CONNECTION_STRING = 
ADMIN_EMAIL=
ADMIN_PASSWORD=
SECRET_KEY=

```

### Setting up values for env variables :
- #### MONGODB_CONNECTION_STRING : 
     - Go to official MongoDB website. 
     - Sign up for Atlas.
     - Create a new project.
     - Get your connection string and store in MONGODB_CONNECTION_STRING variable in the env file
- #### ADMIN_EMAIL :  
     - Your email from which you want all the verification mails to be sent to new users.       
- #### ADMIN_PASSWORD :
     - We need to setup a password for email service.
     - Go to *Manage Your Google Account* option of the admin email account.
     - Switch 2 step verification on if not already in the *Security* tab.
       ![2step](https://github.com/RishabhJain0721/Dorm-Deals-Backend/assets/107767172/200e9a71-69ca-4c1e-a84e-dd2ea9c51a37)

     - Search for *App Passwords* in the search bar.
![appPass](https://github.com/RishabhJain0721/Dorm-Deals-Backend/assets/107767172/044917ec-1137-4417-a8f4-d9bb2852a3e6)

    - Create a new app(Dorm Deals) and copy the generated password.
      ![app](https://github.com/RishabhJain0721/Dorm-Deals-Backend/assets/107767172/045d06be-b48b-4ef9-81e1-b4cddb93a842)
    - Paste the password in the ADMIN_PASSWORD variable in env file.
- #### SECRET_KEY :
    - Any strong string of your choice (eg. katiepattie0@##)  

## Running the Server
```bash

npm  start

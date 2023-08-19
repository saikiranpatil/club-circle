# Club Circle

Club Circle empowers diverse teams to efficiently achieve their objectives by simplifying complex projects into manageable segments through user tasks and subtasks. Streamlining collaboration, optimizing work distribution, and effortless progress tracking are integral features of Club Circle's comprehensive task management capabilities.

## Demo
https://github.com/saikiranpatil/club-circle/assets/84263946/8b95d295-18d9-4d05-b33d-7cef4ec99f3a

## Installation Instructions

Follow these steps to set up the project from scratch:

### Backend Setup

Clone the repository and install backend dependencies:

```bash
$ git clone https://github.com/saikiranpatil/club-circle.git
$ npm install
```

### Frontend Setup

Navigate to the frontend directory and install frontend dependencies:

```bash
$ cd frontend
$ npm install
```

**Note**: As of now, the Admin Dashboard is not available. To claim admin access, roles need to be manually updated.

## Running the Project

1. Create a `.env` file at the root of the project folder and provide the following configurations:

```dotenv
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
COOKIE_EXPIRE=
SMTP_SERVICE_PROVIDER=  # Ex: "gmail"
SMTP_EMAIL_ADDRESS=     # Ex: "username@mail.com"
SMTP_CLIENT_ID=
SMTP_CLIENT_SECRET=
SMTP_REFRESH_TOKEN=     # Google API Configurations
```

2. Start the backend server:

```bash
$ nodemon
```

3. Start the frontend:

```bash
$ cd frontend
$ npm start
```

## Implemented Features

- JSON Web Token for user authentication.
- Utilization of bcrypt for password encryption.
- Email notifications for assigned subtasks.
- Password recovery via email.
- User login, logout, and registration.
- Creation and management of tasks.
- Creation and managing of subtasks.

## Planned Features

- Admin dashboard with comprehensive access.
- Enhanced response handling for subtask files, stored on Cloudinary.
- Discussion Forum for collaborative interactions among club members, fostering idea sharing and project planning.

Elevate your team's productivity and success with Club Circle's powerful task management platform. Streamline collaboration, enhance communication, and unlock efficient project execution.

# Workasana

A full-stack task management application to create, assign, and track project tasks across teams.
Built with a React frontend, Express/Node backend, MongoDB database, and JWT-based authentication.

---

## Demo Link

[Live Demo](https://workasana-project-client.vercel.app/)  

---

## Login

> **Guest**  
> Username: `john.doe@example.com`  
> Password: `Nan@dec02`

---

## Quick Start

```
# Clone the repository
git clone https://github.com/Manoj2571/workasanaProject.git
cd workasanaProject

# Install server and client dependencies
cd server && npm install
cd ../client && npm install

# Start the server
cd ../server && npm start

# Start the client
cd ../client && npm start

```

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- JWT
- Chart.js

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Demo Video Link](https://youtu.be/dCKsGDHV094)

## Features

**Authentication**

- User signup and login with JWT
- Protected routes for authorized access
- Error and response handling


**Task Management**

- Create tasks with fields: title, description, due date
- Assign tasks to projects and teams using dropdown menus
- Select task status: To Do, In Progress, Blocked, Complete
- Edit existing tasks and update their status
- View detailed information for each task

**Task List**

- Display all tasks in a clean, filterable list
- Filter tasks by status, project, or team via URL
- Sort tasks by due date or other criteria

**Projects View**

- Group tasks by project
- Filter tasks within each project
- View project-specific details and related tasks
- Add new tasks directly from the project view

**Team Management**

- Display list of existing teams
- Add new teams easily with one click
- View individual team details and their members
- Add new team members via the Team Detail view

**Reports & Visualization**

- Charts for weekly task completion
- Visual indicators for pending work
- Statistics grouped by project, team, and task owner

**User Profile & Feedback**

- Access user details via secure login
- Logout to end user session
- Visual alerts and feedback for key actions like updates and submissions
- Loading indicators during data operations

## API Reference

### POST /auth/signup
Register a new user

**Sample Response:**
```
{ 
 "message": "User added successfully.",
 "user": { 
    "_id": "user123",
     "email": "user@example.com", ... 
 } 
}
```
### POST /auth/login
Authenticate user and return JWT

**Sample Response:**
```
{ 
    "message": "Login Successful",
    "token": "jwt_token",
    "user": { 
        "_id": "user123",
        "email": "user@example.com", ... 
    } 
}
```
### GET /auth/me
Get authenticated user info

**Sample Response:**
```
{ 
    "_id": "user123",
    "email": "user@example.com",
    "name": "John Doe", ... 
}
```

### GET /users
Get list of all users

**Sample Response:**
```
[
    { "_id": "user123",
    "name": "Jane Doe",
    "email": "jane@example.com" }, 
    ...
]
```

### POST /tasks
Create a new task

**Sample Response:**
```
{ 
    "message": "New task created successfully.
    "task": { 
        "_id": "task123",
        "title": "Task A",
        ... 
    } 
}
```
### GET /tasks
Get all tasks with optional filters: owners, team, project, status, tags

**Sample Response:**
```
[
    {
        "_id": "task123",
        "title": "Task A",
        "status": "To Do",
        ...
    },
    ...
]
```
### POST /tasks/:id
Update a task by ID

**Sample Response:**
```
{ 
    "message": "Task updated successfully", 
    "task": {
        "_id": "task123",
        "title": "Updated Task",
        ...
    }
}
```
### DELETE /tasks/:id
Delete a task by ID

**Sample Response:**
```
{ "message": "Task deleted successfully." }
```

### POST /teams
Create a new team

**Sample Response:**
```
{ 
    "message": "New team created successfully.", 
    "team": {
        "_id": "team123",
        "name": "Dev Team",
        ...
    } 
}
```
### POST /teams/:team_id/member
Add a new member to a team

**Sample Response:**
```
{
    "message": "New team member added successfully.",
    "team": {
        "_id": "team123",
        "members": [ ... ]
    }
}
```
### GET /teams
List all teams

**Sample Response:**
```
[
    {"_id": "team123",
    "name": "Dev Team",
    "members": [ ... ]
    },
    ...
]
```
### POST /projects
Create a new project

**Sample Response:**
```
{
    "message": "New project created successfully.",
    "project": {
        "_id": "project123",
        "name": "Redesign",
        ...
    } 
}
```
### GET /projects
List all projects or filter by name

**Sample Response:**
```
[
    {
        "_id": "project123",
        "name": "Redesign" 
    }, 
    ...
]
```
### GET /tags
List all tags

**Sample Response:**
```
[
    {
        "_id": "tag123",
        "name": "Urgent"
    }, 
    ...
]
```
### GET /report/last-week
Get count of tasks completed per day in the last week

**Sample Response:**
```
[
    {"_id": "18-06-2025", "count": 4 },
    { "_id": "19-06-2025", "count": 2 }
]
```
### GET /report/pending
Get pending tasks and their estimated completion time

**Sample Response:**
```
[
    {
        "name": "Task A",
        "timeToComplete": 2
    },
    ...
]
```
### GET /report/closed-tasks
Get completed task counts grouped by team, project, and owner

**Sample Response:**
```
{
  "byOwners": [
    {
        "_id": { "name": "Alice" },
        "count": 3
    }
  ],
  "byProject": [
    {
        "_id": { "name": "Website" },
        "count": 5
    }
  ],
  "byTeam": [
    {
        "_id": { "name": "Backend Team" }, "count": 2
    }
  ]
}
```

## Contact
For bugs or feature requests, please reach out to manojreddy2571@gmail.com

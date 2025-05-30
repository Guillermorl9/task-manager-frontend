# Task Manager (Frontend)

This project consists of developing a web application to manage tasks in a simple and efficient way. The goal is for any user to be able to create, organize, and track their tasks from any device, without complications.

To achieve this, I used Java with Spring Boot for the backend, creating a REST API with authentication, validation, and documentation. The frontend is built with Ionic Angular, providing a responsive and user-friendly interface. Data is stored in PostgreSQL, running in a Docker container for easier deployment.

Although the project isn't overly complex compared to others, I chose to focus especially on backend development because it's the area I most wanted to learn and improve in. And honestly, I did: I gained a deeper understanding of APIs, security, design, and best practices.

---

## Objectives

1. Build a cross-platform application for task management.
2. Develop a REST API with Java and Spring Boot.
3. Create a responsive frontend with Ionic Angular.
4. Store data in a PostgreSQL database.
5. Use Docker for database setup and deployment.
6. Deepen my understanding of backend development and best practices.

---

## Motivation

These days, everyone has countless things to do, and it’s easy to lose track. This app aims to be a simple and accessible way to organize tasks and improve productivity. There are many task management apps out there, but many are either too complex or paid. I wanted to create a simpler, more practical, and free alternative.

Additionally, this project was a great opportunity to bring together everything I’ve learned during my training, especially in backend development, which is where I focused the most and gained a much better understanding of how APIs are built and managed.

---

## Frontend Structure

The frontend is built with Ionic Angular, which ensures the app looks good on both desktop and mobile. The structure is divided into services responsible for different tasks, and everything is organized by routes based on the content the user wants to see.

### Main Services

- **AuthService**: Handles everything related to authentication (login, register, logout). It also manages the user session using LocalStorage, where the JWT (`access_token`) and user information (`access_user`) are stored.
- **TaskApiService, TaskListApiService, and CategoryService**: Communicate with the backend REST API. Each one handles its respective entity (tasks, lists, and categories).
- **TaskManagerService**: Acts as a bridge between frontend components and API services. It simplifies component logic and centralizes data handling.

---

## Navigation

The app is organized into routes, each with a different view:

- `/login`: login screen
- `/register`: registration screen
- `/home`: main view with today’s tasks
- `/task-lists`: access to the user’s task lists
- `/calendar`: calendar view to check tasks for specific dates
- `/settings`: user settings

---

## Frontend Security

Two guards are implemented to control route access:

- One guard prevents already logged-in users from accessing `/login` or `/register`.
- Another guard blocks access to protected routes if the user is not logged in.

Additionally, there is an HTTP interceptor that automatically adds the JWT token to the headers of all HTTP requests, except for public ones (login and registration).

---

## User Interface

The interface is designed to be simple and functional. Most views display tasks as lists: today’s tasks, tasks for a specific calendar date, or tasks grouped into custom lists. The design is clean and adapts well to both large screens and mobile devices.

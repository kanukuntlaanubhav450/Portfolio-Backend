# Portfolio Backend API

This is the backend service for the MERN Stack Portfolio project. It provides a REST API to manage portfolio content (Projects, Skills, Experience, Testimonials, Services) and handles file uploads to Firebase Storage.

## Technologies Used
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Admin SDK

## Prerequisites
- Node.js (v14 or higher)
- A Firebase Project with Firestore and Storage enabled.
- A Firebase Service Account Key (`serviceAccountKey.json`).

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Environment Variables**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your desired port (default: 5000).

3.  **Setup Firebase Credentials**
    - Go to your Firebase Console > Project Settings > Service accounts.
    - Generate a new private key.
    - Rename the downloaded file to `serviceAccountKey.json`.
    - Place it in the `config/` directory: `Backend/config/serviceAccountKey.json`.

    > **Important**: Never commit `serviceAccountKey.json` or `.env` to version control.

## Running the Server

- **Development Mode** (with hot-reload if nodemon is installed):
  ```bash
  npm run dev
  ```
- **Production Start**:
  ```bash
  node index.js
  ```

## API Endpoints

### Public Endpoints
- `GET /api/projects`: Get all projects
- `GET /api/skills`: Get all skills
- `GET /api/services`: Get all services
- `GET /api/testimonials`: Get all testimonials
- `GET /api/experience`: Get all experience entries
- `GET /api/about`: Get about me info
- `POST /api/contact`: Send a contact message

### Protected Endpoints (Requires Auth Token)
All `POST`, `PUT`, `DELETE` operations on content resources require a valid Firebase Auth ID Token in the Authorization header.

- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- _(Similar patterns for skills, services, testimonials, etc.)_
- `POST /api/upload`: Upload an image (Returns URL)

## Folder Structure
- `config/`: Firebase configuration
- `controllers/`: Logic for handling requests
- `routes/`: API route definitions
- `middleware/`: Auth verification middleware

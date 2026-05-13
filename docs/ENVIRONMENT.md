# Environment Variables

To run this project locally, you will need to set up the following environment variables.

## Backend (`mosque-backend/.env`)

| Variable | Description |
| :--- | :--- |
| `PORT` | The port the backend server will run on (default: 5000) |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | A secret key for JWT authentication |

## Frontend (`mosque-frontend/.env.local`)

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The URL of the backend API (e.g., http://localhost:5000/api/v1) |

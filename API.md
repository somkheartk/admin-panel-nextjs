# API Documentation

## Base URL

```
http://localhost:3001/api
```

For production, replace with your actual API domain.

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response

```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Endpoints

### Authentication

#### Register User

Register a new user account.

**Endpoint:** `POST /auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

**Status Codes:**
- `201 Created`: User successfully registered
- `409 Conflict`: User with email already exists
- `400 Bad Request`: Invalid input data

---

#### Login

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "admin@admin.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@admin.com",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "super_admin"
  }
}
```

**Status Codes:**
- `200 OK`: Login successful
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Invalid input data

---

#### Get Profile

Get the profile of the currently authenticated user.

**Endpoint:** `GET /auth/profile`

**Authentication:** Required (Bearer Token)

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "admin@admin.com",
  "firstName": "Super",
  "lastName": "Admin",
  "role": "super_admin",
  "isActive": true,
  "lastLogin": "2025-10-15T08:30:00.000Z",
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-15T08:30:00.000Z"
}
```

**Status Codes:**
- `200 OK`: Profile retrieved successfully
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found

---

### Users Management

#### Get All Users

Retrieve a list of all users.

**Endpoint:** `GET /users`

**Authentication:** Required (Manager role or higher)

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@admin.com",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "super_admin",
    "isActive": true,
    "lastLogin": "2025-10-15T08:30:00.000Z",
    "createdAt": "2025-10-01T00:00:00.000Z",
    "updatedAt": "2025-10-15T08:30:00.000Z"
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "isActive": true,
    "lastLogin": null,
    "createdAt": "2025-10-10T10:00:00.000Z",
    "updatedAt": "2025-10-10T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK`: Users retrieved successfully
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions

---

#### Get User by ID

Retrieve a specific user by their ID.

**Endpoint:** `GET /users/:id`

**Authentication:** Required (User role or higher)

**Parameters:**
- `id` (string, required): User ID

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "admin@admin.com",
  "firstName": "Super",
  "lastName": "Admin",
  "role": "super_admin",
  "isActive": true,
  "lastLogin": "2025-10-15T08:30:00.000Z",
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-15T08:30:00.000Z"
}
```

**Status Codes:**
- `200 OK`: User retrieved successfully
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found

---

#### Create User

Create a new user.

**Endpoint:** `POST /users`

**Authentication:** Required (Admin role or higher)

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "manager"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "manager",
  "isActive": true,
  "createdAt": "2025-10-15T09:00:00.000Z",
  "updatedAt": "2025-10-15T09:00:00.000Z"
}
```

**Status Codes:**
- `201 Created`: User created successfully
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions
- `409 Conflict`: User with email already exists
- `400 Bad Request`: Invalid input data

---

#### Update User

Update an existing user.

**Endpoint:** `PATCH /users/:id`

**Authentication:** Required (Admin role or higher)

**Parameters:**
- `id` (string, required): User ID

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin",
  "isActive": false
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin",
  "isActive": false,
  "createdAt": "2025-10-15T09:00:00.000Z",
  "updatedAt": "2025-10-15T10:00:00.000Z"
}
```

**Status Codes:**
- `200 OK`: User updated successfully
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: User not found
- `400 Bad Request`: Invalid input data

---

#### Delete User

Delete a user.

**Endpoint:** `DELETE /users/:id`

**Authentication:** Required (Admin role or higher)

**Parameters:**
- `id` (string, required): User ID

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Status Codes:**
- `200 OK`: User deleted successfully
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: User not found

---

#### Change Password

Change the password of the currently authenticated user.

**Endpoint:** `POST /users/change-password`

**Authentication:** Required (User role or higher)

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

**Status Codes:**
- `200 OK`: Password changed successfully
- `401 Unauthorized`: Invalid or missing token
- `409 Conflict`: Current password is incorrect
- `400 Bad Request`: Invalid input data

---

## Role-Based Access Control

### Role Hierarchy

1. **super_admin** (Level 4) - Highest permissions
2. **admin** (Level 3)
3. **manager** (Level 2)
4. **user** (Level 1) - Basic permissions

### Permission Matrix

| Endpoint | User | Manager | Admin | Super Admin |
|----------|------|---------|-------|-------------|
| GET /auth/profile | ✅ | ✅ | ✅ | ✅ |
| GET /users | ❌ | ✅ | ✅ | ✅ |
| GET /users/:id | ✅ | ✅ | ✅ | ✅ |
| POST /users | ❌ | ❌ | ✅ | ✅ |
| PATCH /users/:id | ❌ | ❌ | ✅ | ✅ |
| DELETE /users/:id | ❌ | ❌ | ✅ | ✅ |
| POST /users/change-password | ✅ | ✅ | ✅ | ✅ |

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required or failed |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding it for production:

- Login endpoint: 5 requests per minute per IP
- Registration endpoint: 3 requests per hour per IP
- Other endpoints: 100 requests per minute per user

## Examples

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"Admin@123"}'
```

**Get all users:**
```bash
curl -X GET http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create user:**
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "email":"test@example.com",
    "password":"Test123456",
    "firstName":"Test",
    "lastName":"User",
    "role":"user"
  }'
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Login
const login = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: 'admin@admin.com',
    password: 'Admin@123'
  });
  return response.data;
};

// Get all users
const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Create user
const createUser = async (token, userData) => {
  const response = await axios.post(`${API_URL}/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
```

## Postman Collection

Import this collection to Postman for easy API testing:

```json
{
  "info": {
    "name": "Admin Panel API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@admin.com\",\n  \"password\": \"Admin@123\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001/api"
    }
  ]
}
```

## Versioning

Current API Version: **v1**

Future versions will be accessible via:
```
http://localhost:3001/api/v2/...
```

## Support

For API support and questions:
- Open an issue on GitHub
- Check the main README.md
- Review the setup guide in SETUP.md

---

**Last Updated:** October 15, 2025

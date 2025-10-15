# Setup Guide

This guide will help you set up and run the Admin Panel project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start with Docker](#quick-start-with-docker)
3. [Manual Setup](#manual-setup)
4. [Development Workflow](#development-workflow)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: Version 20.x or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm**: Comes with Node.js
  - Verify installation: `npm --version`

- **Docker & Docker Compose** (for Docker setup)
  - Docker Desktop: https://www.docker.com/products/docker-desktop/
  - Verify installation: `docker --version` and `docker-compose --version`

- **MongoDB** (for manual setup)
  - Download from: https://www.mongodb.com/try/download/community
  - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Optional Tools

- **Git**: For version control
- **MongoDB Compass**: GUI for MongoDB
- **Postman**: For API testing
- **VS Code**: Recommended IDE with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

## Quick Start with Docker

This is the easiest way to get started. All services will be configured automatically.

### Step 1: Clone the Repository

```bash
git clone https://github.com/somkheartk/admin-panel-nextjs.git
cd admin-panel-nextjs
```

### Step 2: Start Services

```bash
docker-compose up -d
```

This command will:
- Pull necessary Docker images (first time only)
- Start MongoDB on port 27017
- Start Backend API on port 3001
- Start Frontend on port 3000
- Initialize the database with default admin user

### Step 3: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **MongoDB**: localhost:27017

### Step 4: Login

Use the default credentials:
- **Email**: admin@admin.com
- **Password**: Admin@123

### Managing Docker Services

**View logs:**
```bash
docker-compose logs -f
```

**Stop services:**
```bash
docker-compose down
```

**Restart services:**
```bash
docker-compose restart
```

**Rebuild services:**
```bash
docker-compose up -d --build
```

## Manual Setup

If you prefer to run services locally without Docker:

### Step 1: Install MongoDB

#### Option A: Local Installation

**Windows:**
1. Download MongoDB Community Server
2. Run the installer
3. Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option B: Use MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update backend `.env` file with the connection string

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your MongoDB connection
# nano .env  (or use your favorite editor)

# Start the backend in development mode
npm run start:dev
```

The backend will start on http://localhost:3001

### Step 3: Initialize Database

If using local MongoDB, you need to create the default admin user manually.

**Connect to MongoDB:**
```bash
mongosh
```

**Run initialization commands:**
```javascript
use admin_panel

db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ isActive: 1 })

db.users.insertOne({
  email: 'admin@admin.com',
  password: '$2b$10$YQv0qr9TqHPq9GxQH.RW8OvJFq8XKqZ8xOvJFq8XKqZ8xOvJFq8XK',
  firstName: 'Super',
  lastName: 'Admin',
  role: 'super_admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})

exit
```

### Step 4: Setup Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start the frontend in development mode
npm run dev
```

The frontend will start on http://localhost:3000

### Step 5: Access the Application

Navigate to http://localhost:3000 and login with:
- **Email**: admin@admin.com
- **Password**: Admin@123

## Development Workflow

### Backend Development

```bash
cd backend

# Start in watch mode (auto-restart on changes)
npm run start:dev

# Run linter
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Start production build
npm run start:prod
```

### Frontend Development

```bash
cd frontend

# Start in development mode
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production build
npm start
```

### Running Both Services

From the root directory:

```bash
# Install root dependencies first
npm install

# Run both frontend and backend
npm run dev
```

## Environment Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Testing

### Backend Tests

```bash
cd backend

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Testing API Endpoints

You can test the API using curl or Postman:

**Register a new user:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "Admin@123"
  }'
```

## Database Management

### Using MongoDB Compass

1. Download and install MongoDB Compass
2. Connect using: `mongodb://admin:admin123@localhost:27017/?authSource=admin`
3. Browse and manage your data visually

### Using mongosh (MongoDB Shell)

```bash
# Connect to MongoDB
mongosh "mongodb://admin:admin123@localhost:27017/?authSource=admin"

# Switch to database
use admin_panel

# View collections
show collections

# Query users
db.users.find().pretty()

# Count users by role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])
```

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using the port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### MongoDB Connection Failed

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
1. Check if MongoDB is running:
   ```bash
   # macOS/Linux
   sudo systemctl status mongodb
   
   # Docker
   docker-compose ps
   ```

2. Verify connection string in `.env`
3. Check firewall settings
4. Ensure MongoDB is listening on the correct port

#### npm install Fails

**Solutions**:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`: `rm -rf node_modules package-lock.json`
3. Run `npm install` again
4. Try using different Node.js version (use nvm)

#### Cannot Access Frontend

**Solutions**:
1. Check if frontend is running: `npm run dev` in frontend directory
2. Clear browser cache
3. Try incognito/private window
4. Check browser console for errors

#### API Returns 401 Unauthorized

**Solutions**:
1. Check if JWT token is valid
2. Login again to get new token
3. Verify backend JWT_SECRET matches
4. Check token expiration time

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/somkheartk/admin-panel-nextjs/issues)
2. Review backend logs: `docker-compose logs backend`
3. Review frontend logs in browser console
4. Enable debug mode in `.env`: `NODE_ENV=development`

## Production Deployment

### Environment Setup

1. **Set strong passwords and secrets**
2. **Use production MongoDB instance**
3. **Enable HTTPS/SSL**
4. **Set up proper CORS configuration**
5. **Configure firewall rules**

### Deployment Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET to a strong random string
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure domain and DNS
- [ ] Enable rate limiting
- [ ] Set up error tracking (e.g., Sentry)

### Recommended Hosting Platforms

**Frontend:**
- Vercel (Recommended for Next.js)
- Netlify
- AWS Amplify
- Cloudflare Pages

**Backend:**
- Heroku
- Railway
- Render
- AWS Elastic Beanstalk
- DigitalOcean App Platform

**Database:**
- MongoDB Atlas (Recommended)
- AWS DocumentDB
- Azure Cosmos DB

## Next Steps

After successful setup:

1. **Change the default admin password** from the UI
2. **Create additional users** with different roles
3. **Explore the dashboard** and user management features
4. **Customize the application** to fit your needs
5. **Read the full documentation** in README.md
6. **Review database schema** in DATABASE.md

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Happy Coding! 🚀**

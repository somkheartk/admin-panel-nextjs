# Admin Panel - Next.js & NestJS

A comprehensive admin panel built with Next.js (frontend) and NestJS (backend) with MongoDB database, featuring multi-role authentication and authorization system.

## 🚀 Features

- ✅ **Next.js 14** with TypeScript and App Router
- ✅ **NestJS** backend with TypeScript
- ✅ **MongoDB** database with Mongoose ODM
- ✅ **Multi-Role Authentication** (Super Admin, Admin, Manager, User)
- ✅ **JWT Authentication** with Passport.js
- ✅ **Role-Based Access Control** (RBAC)
- ✅ **RESTful API** with proper error handling
- ✅ **Responsive UI** with Tailwind CSS
- ✅ **Docker Support** with Docker Compose
- ✅ **CI/CD Pipeline** with GitHub Actions
- ✅ **Form Validation** with React Hook Form
- ✅ **State Management** with Zustand
- ✅ **Toast Notifications** with React Hot Toast

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- MongoDB 7.0 or higher (or use Docker)
- Docker and Docker Compose (optional)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **Password Hashing**: bcrypt

## 📦 Project Structure

```
admin-panel-nextjs/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   └── users/       # Users management page
│   │   ├── components/      # Reusable React components
│   │   │   ├── Layout/      # Main layout component
│   │   │   └── ProtectedRoute/ # Route protection component
│   │   ├── lib/             # Utilities and helpers
│   │   │   ├── api.ts       # API client functions
│   │   │   ├── api-client.ts # Axios instance
│   │   │   └── store.ts     # Zustand store
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── Dockerfile           # Frontend Docker configuration
│
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── guards/     # Auth guards
│   │   │   ├── strategies/ # Passport strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/          # Users module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── user.schema.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── common/         # Shared resources
│   │   │   ├── decorators/ # Custom decorators
│   │   │   ├── enums/      # Enums (UserRole)
│   │   │   └── guards/     # Guards (RolesGuard)
│   │   ├── app.module.ts   # Root module
│   │   └── main.ts         # Application entry point
│   ├── mongodb-init/       # MongoDB initialization scripts
│   └── Dockerfile          # Backend Docker configuration
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # CI/CD pipeline configuration
│
├── docker-compose.yml      # Docker Compose configuration
└── package.json            # Root package.json

```

## 🚀 Getting Started

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/somkheartk/admin-panel-nextjs.git
cd admin-panel-nextjs
```

2. **Start all services with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 3001
- Frontend on port 3000

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

### Option 2: Manual Setup

#### 1. Install MongoDB

Make sure MongoDB is running on your machine or use a cloud service like MongoDB Atlas.

#### 2. Setup Backend

```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin

# Start the backend
npm run start:dev
```

Backend will run on http://localhost:3001

#### 3. Setup Frontend

```bash
cd frontend
npm install

# Copy environment file
cp .env.example .env.local

# Start the frontend
npm run dev
```

Frontend will run on http://localhost:3000

## 🔐 Default Credentials

After initial setup, use these credentials to login:

- **Email**: admin@admin.com
- **Password**: Admin@123

⚠️ **Important**: Change the default password after first login!

## 👥 User Roles & Permissions

### Role Hierarchy

1. **Super Admin** (Highest)
   - Full system access
   - Manage all users and roles
   - System configuration
   - All CRUD operations

2. **Admin**
   - Manage users
   - View all data
   - Create, update, delete users
   - Access to admin features

3. **Manager**
   - View user list
   - Basic reporting
   - Limited user management

4. **User** (Lowest)
   - View own profile
   - Change own password
   - Basic access

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (Protected)

### Users
- `GET /api/users` - Get all users (Manager+)
- `GET /api/users/:id` - Get user by ID (User+)
- `POST /api/users` - Create new user (Admin+)
- `PATCH /api/users/:id` - Update user (Admin+)
- `DELETE /api/users/:id` - Delete user (Admin+)
- `POST /api/users/change-password` - Change password (User+)

## 🗄️ Database Schema

### User Collection

```javascript
{
  email: String (unique, required),
  password: String (required, hashed),
  firstName: String (required),
  lastName: String (required),
  role: String (enum: ['super_admin', 'admin', 'manager', 'user']),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `email`: unique index
- `role`: index for role-based queries
- `isActive`: index for status queries

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test                 # Run unit tests
npm run test:e2e        # Run e2e tests
npm run test:cov        # Run tests with coverage
```

### Frontend
```bash
cd frontend
npm run lint            # Run linter
npm run build           # Build for production
```

## 🏗️ Build for Production

### Using Docker
```bash
docker-compose up -d
```

### Manual Build

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📝 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. **Backend Tests**
   - Sets up MongoDB service
   - Installs dependencies
   - Runs linting
   - Builds the project
   - Runs tests

2. **Frontend Tests**
   - Installs dependencies
   - Runs linting
   - Builds the project

3. **Docker Build** (on main branch)
   - Builds Docker images for both frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js Team
- NestJS Team
- MongoDB Team
- All contributors and open-source libraries used in this project

## 📧 Contact

For any questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, NestJS, and MongoDB**
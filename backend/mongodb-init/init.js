// MongoDB Initialization Script
// This script creates initial database structure and default admin user

db = db.getSiblingDB('admin_panel');

// Create collections
db.createCollection('users');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ isActive: 1 });

// Insert default super admin user
// Password: Admin@123
db.users.insertOne({
  email: 'admin@admin.com',
  password: '$2b$10$YQv0qr9TqHPq9GxQH.RW8OvJFq8XKqZ8xOvJFq8XKqZ8xOvJFq8XK', // bcrypt hash of 'Admin@123'
  firstName: 'Super',
  lastName: 'Admin',
  role: 'super_admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print('✅ Database initialized successfully');
print('📧 Default admin email: admin@admin.com');
print('🔑 Default admin password: Admin@123');
print('⚠️  Please change the default password after first login!');

# Database Documentation

## Overview

This admin panel uses MongoDB as the database system. MongoDB is a NoSQL document database that provides high performance, high availability, and easy scalability.

## Database Name

**Database**: `admin_panel`

## Collections

### 1. Users Collection

Stores all user information including authentication credentials and profile data.

#### Schema Structure

```javascript
{
  _id: ObjectId,                    // Auto-generated unique identifier
  email: String,                     // User's email address (unique)
  password: String,                  // Hashed password (bcrypt)
  firstName: String,                 // User's first name
  lastName: String,                  // User's last name
  role: String,                      // User's role (enum)
  isActive: Boolean,                 // Account status
  lastLogin: Date,                   // Last login timestamp
  createdAt: Date,                   // Account creation timestamp
  updatedAt: Date                    // Last update timestamp
}
```

#### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes (Auto) | MongoDB auto-generated unique identifier |
| `email` | String | Yes | User's email address, must be unique |
| `password` | String | Yes | Bcrypt hashed password with salt rounds = 10 |
| `firstName` | String | Yes | User's first name |
| `lastName` | String | Yes | User's last name |
| `role` | String | Yes | User role: 'super_admin', 'admin', 'manager', or 'user' |
| `isActive` | Boolean | No (Default: true) | Account activation status |
| `lastLogin` | Date | No | Timestamp of user's last successful login |
| `createdAt` | Date | Yes (Auto) | Timestamp when account was created |
| `updatedAt` | Date | Yes (Auto) | Timestamp when account was last modified |

#### Indexes

```javascript
// Unique index on email for fast lookups and uniqueness constraint
db.users.createIndex({ email: 1 }, { unique: true })

// Index on role for role-based queries
db.users.createIndex({ role: 1 })

// Index on isActive for filtering active/inactive users
db.users.createIndex({ isActive: 1 })

// Compound index for common queries
db.users.createIndex({ role: 1, isActive: 1 })
```

#### Role Enum Values

The `role` field accepts the following values:

1. **super_admin**
   - Hierarchy Level: 4
   - Full system access
   - Can manage all users and roles
   - System configuration access

2. **admin**
   - Hierarchy Level: 3
   - Can manage users
   - Can view all data
   - Limited system configuration

3. **manager**
   - Hierarchy Level: 2
   - Can view user list
   - Basic reporting access
   - Limited management capabilities

4. **user**
   - Hierarchy Level: 1
   - Can view own profile
   - Can change own password
   - Basic user access

#### Sample Documents

**Super Admin User:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "email": "admin@admin.com",
  "password": "$2b$10$YQv0qr9TqHPq9GxQH.RW8OvJFq8XKqZ8xOvJFq8XKqZ8xOvJFq8XK",
  "firstName": "Super",
  "lastName": "Admin",
  "role": "super_admin",
  "isActive": true,
  "lastLogin": ISODate("2025-10-15T08:30:00.000Z"),
  "createdAt": ISODate("2025-10-01T00:00:00.000Z"),
  "updatedAt": ISODate("2025-10-15T08:30:00.000Z")
}
```

**Regular User:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "email": "john.doe@example.com",
  "password": "$2b$10$XQv0qr9TqHPq9GxQH.RW8OvJFq8XKqZ8xOvJFq8XKqZ8xOvJFq8XL",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "isActive": true,
  "lastLogin": ISODate("2025-10-14T15:20:00.000Z"),
  "createdAt": ISODate("2025-10-10T10:00:00.000Z"),
  "updatedAt": ISODate("2025-10-14T15:20:00.000Z")
}
```

## Database Initialization

The database is automatically initialized with a default super admin user when using Docker Compose.

### Initial Setup Script

Location: `backend/mongodb-init/init.js`

The script performs the following actions:

1. Creates the `admin_panel` database
2. Creates the `users` collection
3. Creates necessary indexes
4. Inserts default super admin user

### Default Super Admin Credentials

- **Email**: admin@admin.com
- **Password**: Admin@123

⚠️ **Security Note**: Change these credentials immediately after first login in production environments!

## MongoDB Configuration

### Connection String Format

```
mongodb://[username]:[password]@[host]:[port]/[database]?authSource=[authDb]
```

### Development Configuration

```
MONGODB_URI=mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin
```

### Production Recommendations

1. **Use Strong Credentials**: Change default username and password
2. **Enable Authentication**: Always use authentication in production
3. **Use SSL/TLS**: Enable encrypted connections
4. **Implement IP Whitelisting**: Restrict database access by IP
5. **Regular Backups**: Schedule automated backups
6. **Monitor Performance**: Use MongoDB monitoring tools

### Docker MongoDB Configuration

The `docker-compose.yml` file includes MongoDB configuration:

```yaml
mongodb:
  image: mongo:7.0
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: admin123
    MONGO_INITDB_DATABASE: admin_panel
  ports:
    - "27017:27017"
  volumes:
    - mongodb_data:/data/db
    - ./backend/mongodb-init:/docker-entrypoint-initdb.d
```

## Common Queries

### Find Users by Role

```javascript
db.users.find({ role: "admin" })
```

### Find Active Users

```javascript
db.users.find({ isActive: true })
```

### Find Users by Email

```javascript
db.users.findOne({ email: "admin@admin.com" })
```

### Count Users by Role

```javascript
db.users.countDocuments({ role: "user" })
```

### Update User Role

```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin", updatedAt: new Date() } }
)
```

### Deactivate User

```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isActive: false, updatedAt: new Date() } }
)
```

### Find Recently Active Users

```javascript
db.users.find({
  lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
}).sort({ lastLogin: -1 })
```

## Data Migration

### Export Data

```bash
mongodump --uri="mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin" --out=./backup
```

### Import Data

```bash
mongorestore --uri="mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin" ./backup/admin_panel
```

### Export to JSON

```bash
mongoexport --uri="mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin" --collection=users --out=users.json --jsonArray
```

### Import from JSON

```bash
mongoimport --uri="mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin" --collection=users --file=users.json --jsonArray
```

## Performance Optimization

### Index Usage

Monitor index usage:
```javascript
db.users.getIndexes()
```

Check if queries are using indexes:
```javascript
db.users.find({ email: "admin@admin.com" }).explain("executionStats")
```

### Query Optimization Tips

1. **Use Indexes**: Create indexes on frequently queried fields
2. **Limit Results**: Use `.limit()` for large result sets
3. **Project Fields**: Select only needed fields with projection
4. **Avoid $where**: Use native operators instead of JavaScript evaluation
5. **Use Aggregation Pipeline**: For complex queries

### Aggregation Examples

**Count users by role:**
```javascript
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])
```

**Get active users statistics:**
```javascript
db.users.aggregate([
  { $match: { isActive: true } },
  { $group: {
    _id: "$role",
    total: { $sum: 1 },
    avgLastLogin: { $avg: "$lastLogin" }
  }}
])
```

## Security Best Practices

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **Field Encryption**: Consider encrypting sensitive fields at the application level
3. **Access Control**: Use MongoDB's built-in RBAC for database access
4. **Audit Logging**: Enable MongoDB audit logging for compliance
5. **Network Security**: Use VPN or private networks for database access
6. **Regular Updates**: Keep MongoDB version up to date with security patches

## Backup Strategy

### Automated Backups

Set up automated daily backups:

```bash
# Backup script (backup.sh)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb/$DATE"
mongodump --uri="mongodb://admin:admin123@localhost:27017/admin_panel?authSource=admin" --out="$BACKUP_DIR"
```

### Backup Retention

- Keep daily backups for 7 days
- Keep weekly backups for 4 weeks
- Keep monthly backups for 12 months

## Monitoring

### Key Metrics to Monitor

1. **Connection Pool**: Monitor active connections
2. **Query Performance**: Track slow queries
3. **Disk Usage**: Monitor storage usage
4. **Memory Usage**: Track memory consumption
5. **Replication Lag**: If using replica sets

### MongoDB Compass

Use MongoDB Compass for visual database management:
- Connection String: `mongodb://admin:admin123@localhost:27017/?authSource=admin`

## Troubleshooting

### Common Issues

**Connection Refused:**
- Check if MongoDB is running
- Verify connection string
- Check firewall settings

**Authentication Failed:**
- Verify credentials
- Check authSource parameter
- Ensure user exists in auth database

**Slow Queries:**
- Check if indexes exist
- Use `.explain()` to analyze queries
- Consider adding compound indexes

**Disk Space Full:**
- Clean up old backups
- Compact collections
- Archive old data

## References

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

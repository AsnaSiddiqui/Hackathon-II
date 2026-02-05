# Data Model: Todo Full-Stack Web Application

## Task Entity

### Fields
- `id`: UUID (Primary Key, auto-generated)
- `title`: String (Required, max length 255)
- `description`: Text (Optional)
- `completed`: Boolean (Default: False)
- `priority`: Enum (Values: 'low', 'medium', 'high'; Default: 'medium')
- `due_date`: DateTime (Optional, timezone-aware)
- `category`: String (Optional, max length 100)
- `tags`: JSON (Optional, array of strings)
- `notification_settings`: JSON (Optional, dict with notification preferences)
- `created_at`: DateTime (Auto-generated, timezone-aware)
- `updated_at`: DateTime (Auto-generated, timezone-aware)
- `user_id`: UUID (Foreign Key to user, required)

### Relationships
- `user`: Many-to-One relationship with User (via user_id)

### Validation Rules
- Title must be 1-255 characters
- Due date cannot be in the past (optional validation)
- Priority must be one of the allowed values
- User must exist and be authenticated

### State Transitions
- `created` → `active` (when first created)
- `active` → `completed` (when task is marked complete)
- `completed` → `active` (when task is unmarked)

## User Entity (Managed by Better Auth)

### Fields
- `id`: UUID (Primary Key, managed by Better Auth)
- `email`: String (Unique, required, validated)
- `name`: String (Optional)
- `created_at`: DateTime (Auto-generated)
- `updated_at`: DateTime (Auto-generated)

### Relationships
- `tasks`: One-to-Many relationship with Task

### Validation Rules
- Email must be valid and unique
- Cannot delete user if they have tasks (or cascade delete tasks)

## Additional Considerations

### Indexes
- Index on `user_id` for efficient user-specific queries
- Index on `due_date` for efficient sorting/filtering
- Composite index on `(user_id, completed)` for common queries

### Constraints
- Foreign key constraint on `user_id` referencing users table
- Check constraint to ensure title is not empty
- Unique constraint on user_id + task combination (if needed)
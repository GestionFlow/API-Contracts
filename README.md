#  **API Contracts for Your Project**

> Covers **User Management, Task Management, Project/Board Management, Status Tracking, Authentication, Roles**, etc.

---

# 1️⃣ **Authentication & Authorization**

### **Routes**

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/auth/register` | Create a new user account |
| POST   | `/auth/login`    | Issue JWT tokens          |
| POST   | `/auth/logout`   | Invalidate refresh token  |
| POST   | `/auth/refresh`  | Refresh access token      |

### **Request/Response Schemas**

#### **Register**

```json
POST /auth/register
{
  "name": "Pranav",
  "email": "pranav@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "Pranav",
  "email": "pranav@example.com",
  "createdAt": "timestamp"
}
```

#### **Login**

```json
POST /auth/login
{
  "email": "pranav@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": {
    "id": "uuid",
    "name": "Pranav",
    "email": "pranav@example.com",
    "role": "lead"
  }
}
```

---

# 2️⃣ **User Management**

### **Routes**

| Method | Endpoint     | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/users/me`  | Get logged-in user               |
| GET    | `/users/:id` | Get specific user profile        |
| GET    | `/users`     | List users (filter by role/team) |
| PATCH  | `/users/:id` | Update user (name, role, status) |
| DELETE | `/users/:id` | Soft delete user                 |

### **Schema**

#### User Object

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "admin | lead | member",
  "status": "active | busy | unavailable",
  "currentLocation": "string",
  "tasksAssigned": 4,
  "createdAt": "timestamp"
}
```

---

# 3️⃣ **Project / Board Management**

(Equivalent to GitHub Projects or Jira Boards)

### **Routes**

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/projects`           | Create project            |
| GET    | `/projects`           | List all projects         |
| GET    | `/projects/:id`       | Get project               |
| PATCH  | `/projects/:id`       | Update name, details      |
| DELETE | `/projects/:id`       | Delete project            |
| GET    | `/projects/:id/users` | Users assigned to project |

### **Project Schema**

```json
{
  "id": "uuid",
  "name": "Hackathon Tasks",
  "description": "Manage tasks for hackathon",
  "createdBy": "uuid",
  "createdAt": "timestamp"
}
```

---

# 4️⃣ **Task Management**

### **Routes**

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/tasks`            | Create a new task                   |
| GET    | `/tasks`            | Get tasks (filter by project, user) |
| GET    | `/tasks/:id`        | Get task details                    |
| PATCH  | `/tasks/:id`        | Update task                         |
| PATCH  | `/tasks/:id/status` | Move task across board columns      |
| DELETE | `/tasks/:id`        | Delete task                         |

### **Task Schema**

```json
{
  "id": "uuid",
  "title": "Get snacks for participants",
  "description": "Visit vendor and get items",
  "projectId": "uuid",
  "assignedTo": "uuid",
  "priority": "low | medium | high",
  "status": "todo | in-progress | blocked | completed",
  "tags": ["outside", "urgent"],
  "createdAt": "timestamp"
}
```

---

# 5️⃣ **Task Comments (Discussion)**

### **Routes**

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| POST   | `/tasks/:id/comments` | Add comment    |
| GET    | `/tasks/:id/comments` | List comments  |
| DELETE | `/comments/:id`       | Delete comment |

### **Comment Schema**

```json
{
  "id": "uuid",
  "taskId": "uuid",
  "authorId": "uuid",
  "message": "string",
  "createdAt": "timestamp"
}
```

---

# 6️⃣ **User Activity & Status Tracking**

(Useful for hackathon organizers to see who is free/busy)

### **Routes**

| Method | Endpoint              | Description                             |
| ------ | --------------------- | --------------------------------------- |
| PATCH  | `/users/:id/status`   | Update availability                     |
| PATCH  | `/users/:id/location` | Update location (room, venue, building) |
| GET    | `/users/status/all`   | List statuses of all users              |

### **Schema**

```json
{
  "userId": "uuid",
  "status": "active | busy | on-break",
  "currentLocation": "Hall A / Outside / Unknown",
  "updatedAt": "timestamp"
}
```

---

# 8️⃣ **Notifications (Optional)**

### **Routes**

| POST | `/notifications/send`
Manual or system-triggered notification

### **Schema**

```json
{
  "userId": "uuid",
  "title": "New Task Assigned",
  "message": "You have been assigned Task #24"
}
```

---
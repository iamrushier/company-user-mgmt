# **Company & User Management Dashboard**

## **Project Overview**

Develop a React-based admin dashboard where users can view and manage companies, users, roles, posts, and comments using the provided API.

## **Core Features**

### **1. Authentication (POST /login)**

- Implement a login page with **React Hook Form** for form validation.
- Use **useState** for local state management.
- Handle failed login attempts (401 responses).

---

### **2. Dashboard with API Data (GET Endpoints)**

- Display statistics (total users, companies, roles, etc.) on the dashboard.
- Fetch data using **TanStack Query (React Query)** to optimize API calls.
- Use **Zustand** for global state management to store user authentication details.

---

### **3. User Management**

- List all users (GET /users).
- Show user details by clicking on a user (GET /users/{user_id}).
- Implement a **search bar with useState** for filtering users.
- Store the selected user in **Context API** to avoid refetching.

---

### **4. Company Management**

- Display all companies (GET /companies).
- Show company details (GET /companies/{company_id}).
- Allow users to filter companies by market capital.
- Use **useReducer** to manage filtering and sorting state.

---

### **5. CRUD Operations**

- Implement **React Hook Form** for adding/editing users and companies.
- Use **Axios** for API calls.
- Implement a **toast notification system** for success/error messages.

---

### **6. Role-Based Access**

- Fetch roles (GET /roles) and filter user actions based on roles.
- Use **Zustand** to store the logged-in user's role.

---

### **7. Blog & Comments Section**

- List all posts (GET /posts).
- View a post by ID (GET /posts/{post_id}).
- List comments for a post (GET /comments).
- Show comment details (GET /comments/{comment_id}).

---

## **Tech Stack**

- **React + Vite**
- **Chakra UI, Material UI, Antd** (for UI components)
- **React Query** (for API data fetching)
- **Axios** (for API calls)
- **React Hook Form** (for form handling & validation)
- **useState, useReducer** (for local state management)
- **Context API & Zustand** (for global state management)
- **React Router** (for navigation)

---

## **Stretch Goals (Optional)**

- Implement **Dark Mode** using `useContext`
- Add **pagination** for large lists
- Add **protected routes** (restrict certain pages if not logged in)

## **API Endpoints Used**

<https://app.beeceptor.com/mock-server/json-placeholder>

- `POST /login` - User authentication
- `GET /users` - List users
- `GET /users/{user_id}` - Get user details
- `GET /companies` - List companies
- `GET /companies/{company_id}` - Get company details
- `GET /roles` - List roles
- `GET /roles/{role_id}` - Get role details
- `GET /posts` - List blog posts
- `GET /posts/{post_id}` - Get post details
- `GET /comments` - List comments
- `GET /comments/{comment_id}` - Get comment details
- `GET /todos` - List all To-Do items
- `GET /todos/{todo_id}` - Get a To-Do item

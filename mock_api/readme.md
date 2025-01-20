# Mock API Server
Simple, file-based mock API server for development and testing.

## Setup
1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Data Structure
- All data is stored in separate JSON files:
  - `mock_todos.json` - Todo items
  - `mock_users.json` - User data
  - `mock_items.json` - Product items
- You can edit these files directly when the server is not running
- Files are automatically created if they don't exist

## Customization
1. To add new data types:
   - Create a new JSON file named `mock_yourtype.json`
   - Add the route in server.js: `app.use('/api/yourtype', createRoutes('yourtype'));`
2. To modify existing data:
   - Edit the corresponding JSON file
   - Restart the server if it's running
3. To change the port:
   - Modify the `PORT` constant in server.js

## API Documentation

### TODOS
- #### Get all todos:
  ```bash
  curl http://localhost:3001/api/todos
  ```
- #### Get specific todo:
  ```bash
  curl http://localhost:3001/api/todos/1
  ```
- #### Create todo:
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"title": "New Todo", "completed": false}' \
    http://localhost:3001/api/todos
  ```
- #### Update todo:
  ```bash
  curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"title": "An updated Todo item", "completed": true}' \
    http://localhost:3001/api/todos/1
  ```
- #### Delete todo:
  ```bash
  curl -X DELETE http://localhost:3001/api/todos/1
  ```


### USERS
- #### Get all users:
  ```bash
  curl http://localhost:3001/api/users
  ```
- #### Get specific user:
  ```bash
  curl http://localhost:3001/api/users/1
  ```
- #### Create user:
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "New User", "email": "new@example.com", "role": "user"}' \
    http://localhost:3001/api/users
  ```
- #### Update user:
  ```bash
  curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"name": "Updated User", "email": "updated@example.com", "role": "admin"}' \
    http://localhost:3001/api/users/1
  ```
- #### Delete user:
  ```bash
  curl -X DELETE http://localhost:3001/api/users/1
  ```


### ITEMS
- #### Get all items:
  ```bash
  curl http://localhost:3001/api/items
  ```
- #### Get specific item:
  ```bash
  curl http://localhost:3001/api/items/1
  ```
- #### Create item:
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "New Product", "price": 9.99, "inStock": true}' \
    http://localhost:3001/api/items
  ```
- #### Update item:
  ```bash
  curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"name": "Updated Product", "price": 49.99, "inStock": true}' \
    http://localhost:3001/api/items/1
  ```
- #### Delete item:
  ```bash
  curl -X DELETE http://localhost:3001/api/items/1
  ```

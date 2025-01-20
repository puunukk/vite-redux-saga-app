/**
 * Mock API Server
 * This server provides a simple mock REST API with file-based storage
 * Perfect for development and testing of frontend applications
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001; // You can change this port if needed

// Enable CORS for all routes and origins
app.use(cors());
// Parse JSON bodies for API requests
app.use(express.json());

/**
 * Reads data from a JSON file
 * @param {string} dataType - The type of data (e.g., 'todos', 'users')
 * @returns {Promise<Object>} The parsed JSON data
 */
async function readData(dataType) {
  const filePath = path.join(__dirname, `mock_${dataType}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${dataType} data:`, error);
    // Return empty array if file doesn't exist or is invalid
    return { [dataType]: [] };
  }
}

/**
 * Writes data to a JSON file
 * @param {string} dataType - The type of data (e.g., 'todos', 'users')
 * @param {Object} data - The data to write
 * @returns {Promise<void>}
 */
async function writeData(dataType, data) {
  const filePath = path.join(__dirname, `mock_${dataType}.json`);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${dataType} data:`, error);
    throw error;
  }
}

/**
 * Creates a router with CRUD endpoints for a specific data type
 * @param {string} dataType - The type of data (e.g., 'todos', 'users')
 * @returns {express.Router} Router with CRUD endpoints
 */
function createRoutes(dataType) {
  const router = express.Router();

  // GET all items
  router.get('/', async (req, res) => {
    try {
      const data = await readData(dataType);
      res.json(data[dataType]);
    } catch (error) {
      res.status(500).json({ message: `Error reading ${dataType}` });
    }
  });

  // GET one item by id
  router.get('/:id', async (req, res) => {
    try {
      const data = await readData(dataType);
      const item = data[dataType].find(item => item.id === parseInt(req.params.id));
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: `Error reading ${dataType}` });
    }
  });

  // POST new item
  router.post('/', async (req, res) => {
    try {
      const data = await readData(dataType);
      const newItem = {
        // Generate new ID based on highest existing ID + 1
        id: data[dataType].length > 0 
          ? Math.max(...data[dataType].map(item => item.id)) + 1 
          : 1,
        createdAt: new Date(),
        ...req.body
      };
      
      data[dataType].push(newItem);
      await writeData(dataType, data);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: `Error creating ${dataType}` });
    }
  });

  // PUT update item
  router.put('/:id', async (req, res) => {
    try {
      const data = await readData(dataType);
      const index = data[dataType].findIndex(item => item.id === parseInt(req.params.id));
      
      if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
      }
      
      // Merge existing item with updates, preserving id
      data[dataType][index] = {
        ...data[dataType][index],
        ...req.body,
        id: parseInt(req.params.id)
      };
      
      await writeData(dataType, data);
      res.json(data[dataType][index]);
    } catch (error) {
      res.status(500).json({ message: `Error updating ${dataType}` });
    }
  });

  // DELETE item
  router.delete('/:id', async (req, res) => {
    try {
      const data = await readData(dataType);
      const index = data[dataType].findIndex(item => item.id === parseInt(req.params.id));
      
      if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
      }
      
      data[dataType].splice(index, 1);
      await writeData(dataType, data);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${dataType}` });
    }
  });

  return router;
}

// Register routes for each data type
app.use('/api/todos', createRoutes('todos'));
app.use('/api/users', createRoutes('users'));
app.use('/api/items', createRoutes('items'));

/**
 * Initialize the server and create data files if they don't exist
 */
async function initializeServer() {
  try {
    // List of all data types
    const mockFiles = ['todos', 'users', 'items'];
    
    // Create data files if they don't exist
    for (const file of mockFiles) {
      const filePath = path.join(__dirname, `mock_${file}.json`);
      try {
        await fs.access(filePath);
      } catch {
        // File doesn't exist, create it with empty array
        await writeData(file, { [file]: [] });
      }
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Mock API server running on http://localhost:${PORT}`);
      console.log('Available endpoints:');
      mockFiles.forEach(file => {
        console.log(`  - http://localhost:${PORT}/api/${file} | item specific "/api/${file}/{id}"`);
      });
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

// Start the server
initializeServer();

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# React TypeScript Boilerplate with Redux Saga

## Project Overview
A scalable React TypeScript boilerplate focused on Redux Saga patterns for state management and side effects. Built with Vite, React Router, Redux Saga, and TypeScript. This boilerplate is specifically designed for learning and practicing Redux Saga implementations.

## Technology Stack
- React (Latest version)
- TypeScript
- Vite
- React Router DOM v6+
- Redux + Redux Saga
- Node.js 20.2+

## Project Structure
```
src/
├── routes/
│   └── index.tsx           # Route definitions
├── store/
│   ├── actions/
│   │   ├── apiActions.ts   # API-related actions
│   │   └── todoActions.ts  # Todo-related actions
│   ├── reducers/
│   │   ├── apiReducer.ts   # API state reducer
│   │   └── todoReducer.ts  # Todo state reducer
│   ├── index.ts           # Store configuration
│   ├── initialState.ts    # Initial state definition
│   ├── sagas.ts          # Saga implementations
│   └── types.ts          # TypeScript types
├── pages/
│   ├── Home/
│   ├── NotFound/
│   └── StateExamples/     # Different saga implementation examples
├── components/
│   ├── common/
│   └── layouts/
└── public/
    └── mock.json         # Mock data for development
```

## Key Features
1. Multiple Saga Patterns
   - API calls and data fetching
   - Complex state workflows
   - Side effects management
   
2. State Management
   - Unified Redux + Saga approach
   - Complete state management through Redux
   - Side effects handled via Sagas
   
3. Type-Safe Implementation
   - Fully typed actions and reducers
   - Type-safe store configuration
   - TypeScript interfaces for all data models

4. Routing Setup
   - React Router v6 integration
   - Protected routes capability
   - Route-based code splitting

5. Development Features
   - Mock data support
   - Development/Production environment configuration
   - Clear Saga implementation patterns

## Core Types
```typescript
// Root State Structure
interface RootState {
  todos: {
    items: TodoItem[];
    status: LoadingState;
  };
  api: {
    items: ApiItem[];
    status: LoadingState;
  };
}

// Common Types
interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

interface ApiItem {
  id: number;
  title: string;
  description: string;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}
```

## State Management Pattern
The project uses Redux with Saga for all state management:

1. **Actions**: Defined in separate files per feature
   - apiActions.ts for API-related actions
   - todoActions.ts for todo-related actions

2. **Reducers**: Handle state updates per feature
   - Pure functions
   - Type-safe implementations
   - Immutable state updates

3. **Sagas**: Handle all side effects and complex workflows
   - API calls
   - Async operations
   - State transitions
   - Complex business logic
   - Data transformations

## Development Guidelines

1. **File Structure**
   - Keep feature-related files together
   - Use clear, descriptive file names
   - Maintain flat folder structure in store

2. **State Management**
   - Everything goes through Redux + Saga
   - Use Sagas for all side effects and complex operations
   - Maintain clear action -> saga -> reducer flow

3. **TypeScript Usage**
   - Define interfaces for all data structures
   - Use strict type checking
   - Avoid using 'any'

4. **Code Organization**
   - Group related functionality
   - Keep components focused
   - Use consistent naming conventions

## Setup Instructions
```bash
# Create new project
npm create vite@latest my-redux-saga-app --template react-ts

# Install dependencies
npm install

# Add core dependencies
npm install @reduxjs/toolkit react-redux redux-saga
npm install react-router-dom@latest
npm install -D @types/node
```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally

## Common Saga Patterns

1. **API Calls**
```typescript
function* fetchItems() {
  try {
    yield put(setLoading(true));
    const data = yield call(api.fetchItems);
    yield put(fetchSuccess(data));
  } catch (error) {
    yield put(fetchError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}
```

2. **Complex Workflows**
```typescript
function* processItem(action) {
  try {
    yield put(startProcessing());
    const data = yield call(api.fetchItem, action.payload);
    yield call(processData, data);
    yield put(processingSuccess());
    yield put(updateUI());
  } catch (error) {
    yield put(processingError(error));
  }
}
```

3. **Watcher Pattern**
```typescript
function* watchUserActions() {
  yield takeLatest(FETCH_REQUEST, fetchItems);
  yield takeEvery(PROCESS_ITEM, processItem);
}
```

## Best Practices
1. Keep state normalized
2. Use TypeScript strictly
3. Follow Redux and Saga patterns
4. Maintain clear file structure
5. Document complex saga flows
6. Use consistent naming conventions

## Extension Points
The boilerplate is designed for learning and practicing Saga patterns:

1. **Saga Patterns**
   - API integration
   - Complex workflows
   - Race conditions
   - Parallel operations
   - Error handling

2. **State Management**
   - Advanced reducers
   - Complex saga chains
   - State selectors
   - Action creators

3. **API Integration**
   - Real API endpoints
   - Error handling
   - Retry logic
   - Request/response transformations
# SimpleDo - React Todo App

A simple, Google Keep-inspired todo list application built with React. This project demonstrates the use of various React hooks and local storage for data persistence.

## Learning Objectives

This project demonstrates the following React concepts:

1. **React Hooks**
   - `useState`: State management for form inputs and UI controls
   - `useEffect`: Side effects handling (localStorage, click outside detection)
   - `useContext`: Global state management for todos
   - `useRef`: DOM element references for click outside detection

2. **Context API**
   - Creating and providing context
   - Consuming context with useContext
   - Custom context hook creation

3. **Local Storage**
   - Persisting data in the browser
   - Loading initial state from storage
   - Syncing state changes with storage

4. **CRUD Operations**
   - Create: Adding new todos
   - Read: Displaying todos
   - Update: Editing todos and toggling completion
   - Delete: Removing todos

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx   # Input form for creating todos
│   ├── TodoList.jsx    # Container for displaying todos
│   └── TodoCard.jsx    # Individual todo item display
├── context/
│   └── TodoContext.jsx # Global state management
├── App.jsx            # Main application component
└── App.css           # Styles
```

## Features

1. **Todo Creation**
   - Expandable input form
   - Title and content fields
   - Click outside to collapse

2. **Todo Management**
   - Mark todos as complete
   - Edit existing todos
   - Delete todos
   - Automatic date tracking

3. **Persistence**
   - Todos are saved to localStorage
   - State persists through page reloads

## Learning Guide

1. **State Management**
   - Look at `TodoInput.jsx` for local state management using `useState`
   - Examine `TodoContext.jsx` for global state management

2. **Side Effects**
   - Study the `useEffect` usage in `TodoContext.jsx` for localStorage sync
   - See click-outside detection in `TodoInput.jsx` and `TodoCard.jsx`

3. **Context API**
   - Understand context creation in `TodoContext.jsx`
   - See how context is provided in `App.jsx`
   - Learn context consumption in components

4. **Component Communication**
   - Props passing in `TodoList` to `TodoCard`
   - Context usage for global state access
   - Event handling between components

## Best Practices Demonstrated

1. **Code Organization**
   - Separation of concerns
   - Component-based architecture
   - Context for state management

2. **React Patterns**
   - Custom hook creation
   - Controlled components
   - Conditional rendering

3. **Performance**
   - Local state for UI controls
   - Global state for shared data
   - Efficient re-rendering control

## Development Tips

1. Use the React Developer Tools browser extension to inspect:
   - Component hierarchy
   - Props and state
   - Context values

2. Check localStorage in browser DevTools to see persisted data

3. Experiment with the code:
   - Add new features
   - Modify the styling
   - Implement additional hooks
   - Add sorting/filtering capabilities

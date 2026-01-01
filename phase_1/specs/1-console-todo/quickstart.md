# Quickstart Guide: In-Memory Console-Based ToDo Application

**Date**: 2026-01-01
**Feature**: 1-console-todo

## Overview

This guide provides instructions for running and using the console-based ToDo application. The application provides a menu-driven interface for managing tasks in memory.

## Prerequisites

- Python 3.8 or higher
- No external dependencies required (uses only Python standard library)

## Running the Application

1. Navigate to the project directory
2. Execute the main application file:
   ```bash
   python main.py
   ```

## Using the Application

### Main Menu

The application presents a menu with the following options:

1. **Add Task** - Create a new task
2. **View Tasks** - Display all tasks with their status
3. **Update Task** - Modify an existing task's description
4. **Delete Task** - Remove a task from the list
5. **Mark Task Complete** - Update a task's status to completed
6. **Exit** - Quit the application

### Adding a Task

1. Select "Add Task" from the main menu
2. Enter the task description (1-256 characters)
3. The task will be added to the list with "Incomplete" status

### Viewing Tasks

1. Select "View Tasks" from the main menu
2. All tasks will be displayed with their ID number, description, and completion status
3. If no tasks exist, a message will indicate this

### Updating a Task

1. Select "Update Task" from the main menu
2. Enter the ID number of the task you want to update
3. Enter the new description for the task (1-256 characters)
4. The task description will be updated

### Marking a Task Complete

1. Select "Mark Task Complete" from the main menu
2. Enter the ID number of the task you want to mark complete
3. The task status will be updated to "Complete"

### Deleting a Task

1. Select "Delete Task" from the main menu
2. Enter the ID number of the task you want to delete
3. Confirm the deletion (if prompted)
4. The task will be removed from the list

### Exiting the Application

1. Select "Exit" from the main menu
2. The application will terminate
3. Note: All tasks will be lost when the application exits (in-memory storage)

## Error Handling

- Invalid inputs will display error messages and prompt again
- Attempting operations on non-existent tasks will show error messages
- Empty task lists will display appropriate messages when operations are attempted

## Troubleshooting

- If the application doesn't start, ensure Python 3.8+ is installed
- If menu options don't work, ensure numeric input is provided as requested
- If tasks disappear after adding, remember they are stored only in memory and will be lost on exit
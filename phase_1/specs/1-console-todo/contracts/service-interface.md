# Contract: ToDo Application Service Interface

**Date**: 2026-01-01
**Feature**: 1-console-todo
**Status**: Completed

## Overview

This contract defines the interface between the UI layer and the service layer for the console-based ToDo application. The service layer provides all business logic operations while the UI layer handles user interaction.

## Service Interface

### add_task(description: str) -> bool
- **Purpose**: Create a new task with the given description
- **Input**: description (str) - task description (1-256 characters)
- **Output**: bool - True if task was added successfully, False otherwise
- **Preconditions**:
  - Description is not empty
  - Description is not longer than 256 characters
- **Postconditions**:
  - New task is added to storage with is_completed=False
  - New task has a unique, sequential ID
  - Returns True on success, False on validation failure

### get_all_tasks() -> list[dict]
- **Purpose**: Retrieve all tasks from storage
- **Input**: None
- **Output**: list[dict] - list of task dictionaries with id, description, is_completed
- **Preconditions**: None
- **Postconditions**: Returns all tasks in storage (empty list if no tasks exist)

### get_task_by_id(task_id: int) -> dict | None
- **Purpose**: Retrieve a specific task by its ID
- **Input**: task_id (int) - the ID of the task to retrieve
- **Output**: dict | None - task dictionary if found, None if not found
- **Preconditions**: task_id is a positive integer
- **Postconditions**: Returns task data if found, None otherwise

### update_task_description(task_id: int, new_description: str) -> bool
- **Purpose**: Update the description of an existing task
- **Input**:
  - task_id (int) - ID of the task to update
  - new_description (str) - new task description (1-256 characters)
- **Output**: bool - True if update was successful, False otherwise
- **Preconditions**:
  - Task with task_id exists
  - new_description is not empty
  - new_description is not longer than 256 characters
- **Postconditions**:
  - Task description is updated if valid
  - Returns True on success, False on validation failure or task not found

### mark_task_complete(task_id: int) -> bool
- **Purpose**: Mark a task as complete
- **Input**: task_id (int) - ID of the task to mark complete
- **Output**: bool - True if operation was successful, False otherwise
- **Preconditions**: Task with task_id exists
- **Postconditions**:
  - Task's is_completed status is set to True
  - Returns True on success, False if task not found

### delete_task(task_id: int) -> bool
- **Purpose**: Remove a task from storage
- **Input**: task_id (int) - ID of the task to delete
- **Output**: bool - True if deletion was successful, False otherwise
- **Preconditions**: Task with task_id exists
- **Postconditions**:
  - Task is removed from storage
  - Returns True on success, False if task not found
# Data Model: In-Memory Console-Based ToDo Application

**Date**: 2026-01-01
**Feature**: 1-console-todo
**Status**: Completed

## Overview

This document defines the data structures and relationships for the console-based ToDo application. All data is stored in memory during the application session and is lost when the application exits.

## Task Entity

### Attributes

- **id**: `int` (required, unique, auto-incrementing)
  - Primary identifier for the task
  - Used by users to reference tasks (sequential numbering)
  - Auto-generated when a new task is created

- **description**: `str` (required)
  - Text content of the task
  - Maximum length: 256 characters (as per specification)
  - Cannot be empty or whitespace-only

- **is_completed**: `bool` (required)
  - Status indicator for task completion
  - Default value: `False` (incomplete)
  - Can be changed to `True` (complete) via user action

### Validation Rules

1. **Description Length**: Task descriptions must be between 1 and 256 characters (inclusive)
2. **Description Content**: Task descriptions cannot be empty or contain only whitespace
3. **ID Uniqueness**: Each task must have a unique ID
4. **ID Sequentiality**: IDs are assigned sequentially starting from 1

### State Transitions

- **Incomplete → Complete**: When user marks task as complete
- **Complete → Complete**: No change when user attempts to mark already complete task (no-op)

## Storage Model

### In-Memory Storage Structure

- **tasks**: `list[Task]` or `dict[int, Task]`
  - Stores all Task objects in memory
  - Provides O(1) access by ID if using dictionary
  - Maintains insertion order if using list

- **next_id**: `int`
  - Tracks the next available ID for new tasks
  - Starts at 1 and increments with each new task
  - Ensures unique ID assignment

### Operations

1. **Create**: Add new Task to storage with auto-generated ID
2. **Read**: Retrieve Task by ID from storage
3. **Update**: Modify Task attributes in storage
4. **Delete**: Remove Task from storage by ID
5. **List All**: Return all Tasks from storage

## Relationships

- **No relationships**: The Task entity is independent with no references to other entities
- **Self-contained**: All required information is stored within each Task object
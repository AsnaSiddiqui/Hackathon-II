"""
In-Memory Console-Based ToDo Application
Task data model
"""

class Task:
    """
    A single to-do item with properties including id (int, unique, auto-incrementing),
    description (text, max 256 characters), and completion status (boolean)
    """

    def __init__(self, task_id: int, description: str, is_completed: bool = False):
        if not isinstance(task_id, int) or task_id <= 0:
            raise ValueError("Task ID must be a positive integer")

        if not isinstance(description, str) or len(description) == 0 or len(description) > 256:
            raise ValueError("Task description must be a non-empty string with max 256 characters")

        if not isinstance(is_completed, bool):
            raise ValueError("Task completion status must be a boolean")

        self.id = task_id
        self.description = description
        self.is_completed = is_completed

    def __str__(self):
        status = "✓" if self.is_completed else "○"
        return f"[{status}] {self.id}. {self.description}"

    def __repr__(self):
        return f"Task(id={self.id}, description='{self.description}', is_completed={self.is_completed})"
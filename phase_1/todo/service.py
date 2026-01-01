"""
In-Memory Console-Based ToDo Application
Task operations (add, view, update, delete, mark complete)
"""

from typing import List, Optional
from .models import Task
from .storage import InMemoryStorage


class TaskService:
    """
    Implements core task operations: add_task, get_all_tasks, update_task,
    delete_task, mark_task_complete with validation
    """

    def __init__(self):
        self.storage = InMemoryStorage()

    def add_task(self, description: str) -> bool:
        """
        Add a new task with validation for max 256 chars
        Returns True if task was added successfully, False otherwise
        """
        if not description or not isinstance(description, str):
            return False

        if len(description) == 0 or len(description) > 256:
            return False

        # Create a new task with auto-generated ID
        task_id = self.storage.generate_next_id()
        task = Task(task_id, description, is_completed=False)
        self.storage.add_task(task)
        return True

    def get_all_tasks(self) -> List[Task]:
        """Return all tasks with their status"""
        return self.storage.get_all_tasks()

    def update_task_description(self, task_id: int, new_description: str) -> bool:
        """
        Update the description of an existing task
        Returns True if update was successful, False otherwise
        """
        if not new_description or not isinstance(new_description, str) or len(new_description) == 0 or len(new_description) > 256:
            return False

        task = self.storage.get_task_by_id(task_id)
        if not task:
            return False

        task.description = new_description
        return self.storage.update_task(task_id, description=new_description)

    def mark_task_complete(self, task_id: int) -> bool:
        """
        Mark a task as complete
        Returns True if operation was successful, False otherwise
        """
        task = self.storage.get_task_by_id(task_id)
        if not task:
            return False

        task.is_completed = True
        return self.storage.update_task(task_id, is_completed=True)

    def delete_task(self, task_id: int) -> bool:
        """
        Remove a task from storage
        Returns True if deletion was successful, False otherwise
        """
        return self.storage.delete_task(task_id)

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """Get a specific task by ID"""
        return self.storage.get_task_by_id(task_id)
"""
In-Memory Console-Based ToDo Application
In-memory task storage and ID management
"""

from typing import Dict, List
from .models import Task


class InMemoryStorage:
    """
    Implements in-memory storage with list/dict structure and auto-increment ID
    """

    def __init__(self):
        self._tasks: Dict[int, Task] = {}
        self._next_id = 1

    def add_task(self, task: Task) -> None:
        """Add a task to storage"""
        if task.id in self._tasks:
            raise ValueError(f"Task with ID {task.id} already exists")
        self._tasks[task.id] = task

    def get_task_by_id(self, task_id: int) -> Task:
        """Retrieve a task by its ID"""
        if task_id not in self._tasks:
            return None
        return self._tasks[task_id]

    def get_all_tasks(self) -> List[Task]:
        """Retrieve all tasks"""
        return list(self._tasks.values())

    def update_task(self, task_id: int, **kwargs) -> bool:
        """Update a task's properties"""
        if task_id not in self._tasks:
            return False

        task = self._tasks[task_id]
        for key, value in kwargs.items():
            if hasattr(task, key):
                setattr(task, key, value)
        return True

    def delete_task(self, task_id: int) -> bool:
        """Delete a task by ID"""
        if task_id not in self._tasks:
            return False
        del self._tasks[task_id]
        return True

    def generate_next_id(self) -> int:
        """Generate the next available ID"""
        current_id = self._next_id
        self._next_id += 1
        return current_id
"""
In-Memory Console-Based ToDo Application
Console menu, input handling, and output formatting
"""

from typing import List
from .models import Task
from .service import TaskService


class UI:
    """
    Implements UI functions: display menu, get user input,
    add task UI flow with input validation, view tasks UI display
    """

    def __init__(self, task_service: TaskService):
        self.task_service = task_service

    def display_menu(self) -> None:
        """Display the main menu options"""
        print("\n" + "="*40)
        print("TODO APPLICATION MENU")
        print("="*40)
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task Complete")
        print("4. Update Task")
        print("5. Delete Task")
        print("6. Exit")
        print("="*40)

    def get_user_input(self, prompt: str) -> str:
        """Get user input with a prompt"""
        return input(prompt).strip()

    def get_task_input(self) -> str:
        """Get task description from user with validation"""
        while True:
            description = self.get_user_input("Enter task description: ").strip()
            if not description:
                print("Error: Task description cannot be empty. Please try again.")
                continue
            if len(description) > 256:
                print("Error: Task description is too long. Maximum 256 characters allowed. Please try again.")
                continue
            return description

    def display_tasks(self, tasks: List[Task]) -> None:
        """Display all tasks with proper formatting"""
        if not tasks:
            print("\nNo tasks found.")
            return

        print("\nYour Tasks:")
        print("-" * 40)
        for task in tasks:
            status = "✓" if task.is_completed else "○"
            print(f"[{status}] {task.id}. {task.description}")
        print("-" * 40)

    def display_add_task_result(self, success: bool) -> None:
        """Display result of add task operation"""
        if success:
            print("Task added successfully!")
        else:
            print("Error: Failed to add task.")

    def display_mark_complete_result(self, success: bool) -> None:
        """Display result of mark complete operation"""
        if success:
            print("Task marked as complete!")
        else:
            print("Error: Could not mark task as complete. Task ID may be invalid.")

    def display_update_result(self, success: bool) -> None:
        """Display result of update task operation"""
        if success:
            print("Task updated successfully!")
        else:
            print("Error: Could not update task. Task ID may be invalid or description may be empty.")

    def display_delete_result(self, success: bool) -> None:
        """Display result of delete task operation"""
        if success:
            print("Task deleted successfully!")
        else:
            print("Error: Could not delete task. Task ID may be invalid.")

    def get_task_id_input(self, prompt: str = "Enter task ID: ") -> int:
        """Get task ID from user with validation"""
        while True:
            try:
                task_id_input = self.get_user_input(prompt)
                task_id = int(task_id_input)
                if task_id <= 0:
                    print("Error: Task ID must be a positive integer. Please try again.")
                    continue
                return task_id
            except ValueError:
                print("Error: Please enter a valid number for task ID.")
                continue

    def display_error_message(self, message: str) -> None:
        """Display error message"""
        print(f"Error: {message}")
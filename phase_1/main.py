#!/usr/bin/env python3
"""
In-Memory Console-Based ToDo Application
Application entry point and menu loop
"""

from todo.service import TaskService
from todo.ui import UI


def main():
    """Application entry point"""
    print("Welcome to the In-Memory Console-Based ToDo Application!")

    # Initialize service and UI
    task_service = TaskService()
    ui = UI(task_service)

    # Main menu loop
    while True:
        ui.display_menu()

        choice = ui.get_user_input("Select an option (1-6): ")

        if choice == "1":
            # Add Task
            description = ui.get_task_input()
            success = task_service.add_task(description)
            ui.display_add_task_result(success)

        elif choice == "2":
            # View Tasks
            tasks = task_service.get_all_tasks()
            ui.display_tasks(tasks)

        elif choice == "3":
            # Mark Task Complete
            if not task_service.get_all_tasks():
                ui.display_error_message("No tasks available. Add some tasks first.")
            else:
                task_id = ui.get_task_id_input("Enter task ID to mark as complete: ")
                success = task_service.mark_task_complete(task_id)
                ui.display_mark_complete_result(success)

        elif choice == "4":
            # Update Task
            if not task_service.get_all_tasks():
                ui.display_error_message("No tasks available. Add some tasks first.")
            else:
                task_id = ui.get_task_id_input("Enter task ID to update: ")
                new_description = ui.get_task_input()
                success = task_service.update_task_description(task_id, new_description)
                ui.display_update_result(success)

        elif choice == "5":
            # Delete Task
            if not task_service.get_all_tasks():
                ui.display_error_message("No tasks available. Add some tasks first.")
            else:
                task_id = ui.get_task_id_input("Enter task ID to delete: ")
                success = task_service.delete_task(task_id)
                ui.display_delete_result(success)

        elif choice == "6":
            # Exit
            print("Thank you for using the ToDo Application. Goodbye!")
            break

        else:
            print("Invalid choice. Please select a number between 1-6.")


if __name__ == "__main__":
    main()

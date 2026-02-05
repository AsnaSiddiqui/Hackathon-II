from typing import List, Optional
from sqlmodel import Session, select
from models.task import Task, TaskCreate, TaskUpdate
from models.user import User
from datetime import datetime
import json
import logging

# Set up logger for the task service
logger = logging.getLogger(__name__)

class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def validate_task_data(self, task_data: dict) -> List[str]:
        """
        Validate task data and return a list of error messages
        """
        errors = []

        # Validate title
        if "title" in task_data:
            title = task_data["title"]
            if not title or len(title.strip()) == 0:
                errors.append("Title is required")
            elif len(title) > 255:
                errors.append("Title must be less than 255 characters")

        # Validate due date (if provided)
        if "due_date" in task_data and task_data["due_date"]:
            try:
                due_date = task_data["due_date"]
                if isinstance(due_date, str):
                    # Try to parse the date string - handle various ISO formats
                    # Remove 'Z' suffix and replace with '+00:00' for proper parsing
                    date_str = due_date.replace('Z', '+00:00')
                    if '.' in date_str:
                        # Handle microseconds in ISO format
                        datetime.fromisoformat(date_str)
                    else:
                        # Handle basic ISO format
                        datetime.fromisoformat(date_str)
            except ValueError:
                errors.append("Due date must be a valid ISO format date string")

        # Validate category
        if "category" in task_data and task_data["category"]:
            category = task_data["category"]
            if len(category) > 100:
                errors.append("Category must be less than 100 characters")

        # --- tags validation ---
        # --- tags validation ---
        if "tags" not in task_data or not task_data["tags"]:
            task_data["tags"] = "[]"
        else:
            try:
                parsed_tags = json.loads(task_data["tags"])
                if not isinstance(parsed_tags, list):
                    errors.append("Tags must be a valid JSON array string")
                elif len(parsed_tags) > 20:
                    errors.append("Too many tags (maximum 20 allowed)")
            except json.JSONDecodeError:
                errors.append("Tags must be a valid JSON array string")

        # --- notification_settings validation ---
        if "notification_settings" not in task_data or not task_data["notification_settings"]:
            task_data["notification_settings"] = "{}"
        else:
            try:
                parsed_ns = json.loads(task_data["notification_settings"])
                if not isinstance(parsed_ns, dict):
                    errors.append("notification_settings must be a valid JSON string")
            except json.JSONDecodeError:
                errors.append("notification_settings must be a valid JSON string")



        return errors

    def create_task(self, task_create: TaskCreate, user_id: str) -> Task:
        """
        Create a new task for the specified user
        """
        logger.info(f"Creating new task for user {user_id}")

        # Convert tags and notification_settings to JSON strings if they are lists/dicts
        task_dict = task_create.model_dump()

        # Ensure tags defaults to "[]" (JSON string) if not provided or empty
        if 'tags' not in task_dict or task_dict['tags'] is None or task_dict['tags'] == '' or task_dict['tags'] == []:
            task_dict['tags'] = "[]"
        elif isinstance(task_dict['tags'], list):
            task_dict['tags'] = json.dumps(task_dict['tags'])
        elif isinstance(task_dict['tags'], str):
            # Ensure it's a valid JSON array string
            try:
                parsed_tags = json.loads(task_dict['tags'])
                if not isinstance(parsed_tags, list):
                    task_dict['tags'] = "[]"
            except json.JSONDecodeError:
                task_dict['tags'] = "[]"

        # Ensure notification_settings defaults to "{}" (JSON string) if not provided or empty
        if 'notification_settings' not in task_dict or task_dict['notification_settings'] is None or task_dict['notification_settings'] == '' or task_dict['notification_settings'] == {}:
            task_dict['notification_settings'] = "{}"
        elif isinstance(task_dict['notification_settings'], dict):
            task_dict['notification_settings'] = json.dumps(task_dict['notification_settings'])
        elif isinstance(task_dict['notification_settings'], str):
            # Ensure it's a valid JSON object string
            try:
                parsed_ns = json.loads(task_dict['notification_settings'])
                if not isinstance(parsed_ns, dict):
                    task_dict['notification_settings'] = "{}"
            except json.JSONDecodeError:
                task_dict['notification_settings'] = "{}"

        # Remove created_at and updated_at from the dict to let the database handle them
        task_dict.pop('created_at', None)
        task_dict.pop('updated_at', None)

        # Validate the task data
        validation_errors = self.validate_task_data(task_dict)
        if validation_errors:
            error_msg = f"Validation errors: {'; '.join(validation_errors)}"
            logger.error(f"Task validation failed for user {user_id}: {error_msg}")
            raise ValueError(error_msg)

        task = Task(**task_dict)
        task.user_id = user_id

        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        logger.info(f"Successfully created task {task.id} for user {user_id}")
        return task

    def get_tasks_by_user(
        self,
        user_id: str,
        limit: int = 20,
        offset: int = 0,
        completed: Optional[bool] = None
    ) -> List[Task]:
        """
        Get all tasks for a specific user with optional filters
        """
        query = select(Task).where(Task.user_id == user_id)

        if completed is not None:
            query = query.where(Task.completed == completed)

        query = query.offset(offset).limit(limit).order_by(Task.created_at.desc())

        tasks = self.session.exec(query).all()
        return tasks

    def get_task_by_id(self, task_id: int, user_id: str) -> Optional[Task]:
        """
        Get a specific task by ID for a specific user
        """
        query = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        task = self.session.exec(query).first()
        return task

    def update_task(self, task_id: int, task_update: TaskUpdate, user_id: str) -> Optional[Task]:
        """
        Update a task for a specific user
        """
        logger.info(f"Updating task {task_id} for user {user_id}")

        task = self.get_task_by_id(task_id, user_id)
        if not task:
            logger.warning(f"Attempt to update non-existent task {task_id} for user {user_id}")
            return None

        # Update the task with provided fields
        update_data = task_update.model_dump(exclude_unset=True)

        # Ensure tags defaults to "[]" (JSON string) if not provided or empty, or convert list to JSON string
        if 'tags' in update_data:
            if update_data['tags'] is None or update_data['tags'] == '' or update_data['tags'] == []:
                update_data['tags'] = "[]"
            elif isinstance(update_data['tags'], list):
                update_data['tags'] = json.dumps(update_data['tags'])
            elif isinstance(update_data['tags'], str):
                # Ensure it's a valid JSON array string
                try:
                    parsed_tags = json.loads(update_data['tags'])
                    if not isinstance(parsed_tags, list):
                        update_data['tags'] = "[]"
                except json.JSONDecodeError:
                    update_data['tags'] = "[]"

        # Ensure notification_settings defaults to "{}" (JSON string) if not provided or empty, or convert dict to JSON string
        if 'notification_settings' in update_data:
            if update_data['notification_settings'] is None or update_data['notification_settings'] == '' or update_data['notification_settings'] == {}:
                update_data['notification_settings'] = "{}"
            elif isinstance(update_data['notification_settings'], dict):
                update_data['notification_settings'] = json.dumps(update_data['notification_settings'])
            elif isinstance(update_data['notification_settings'], str):
                # Ensure it's a valid JSON object string
                try:
                    parsed_ns = json.loads(update_data['notification_settings'])
                    if not isinstance(parsed_ns, dict):
                        update_data['notification_settings'] = "{}"
                except json.JSONDecodeError:
                    update_data['notification_settings'] = "{}"

        # Remove updated_at from the update data to let the database handle it
        update_data.pop('updated_at', None)

        # Validate the updated data
        validation_errors = self.validate_task_data(update_data)
        if validation_errors:
            error_msg = f"Validation errors: {'; '.join(validation_errors)}"
            logger.error(f"Task update validation failed for task {task_id} of user {user_id}: {error_msg}")
            raise ValueError(error_msg)

        for field, value in update_data.items():
            setattr(task, field, value)

        # SQLAlchemy will automatically update updated_at due to the onupdate trigger
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        logger.info(f"Successfully updated task {task_id} for user {user_id}")
        return task

    def delete_task(self, task_id: int, user_id: str) -> bool:
        """
        Delete a task for a specific user
        """
        logger.info(f"Deleting task {task_id} for user {user_id}")

        task = self.get_task_by_id(task_id, user_id)
        if not task:
            logger.warning(f"Attempt to delete non-existent task {task_id} for user {user_id}")
            return False

        self.session.delete(task)
        self.session.commit()
        logger.info(f"Successfully deleted task {task_id} for user {user_id}")
        return True

    def toggle_task_completion(self, task_id: int, user_id: str) -> Optional[Task]:
        """
        Toggle the completion status of a task
        """
        logger.info(f"Toggling completion status for task {task_id} of user {user_id}")

        task = self.get_task_by_id(task_id, user_id)
        if not task:
            logger.warning(f"Attempt to toggle completion status of non-existent task {task_id} for user {user_id}")
            return None

        new_status = not task.completed
        task.completed = new_status
        # SQLAlchemy will automatically update updated_at due to the onupdate trigger
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        logger.info(f"Successfully toggled completion status to {new_status} for task {task_id} of user {user_id}")
        return task
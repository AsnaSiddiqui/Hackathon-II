"""
In-Memory Console-Based ToDo Application
Input validation helpers
"""

def validate_task_description(description: str) -> bool:
    """
    Validate task description: non-empty and max 256 characters
    """
    if not isinstance(description, str):
        return False
    if len(description) == 0:
        return False
    if len(description) > 256:
        return False
    return True


def validate_task_id(task_id) -> bool:
    """
    Validate task ID: positive integer
    """
    if not isinstance(task_id, int):
        try:
            task_id = int(task_id)
        except (ValueError, TypeError):
            return False
    return task_id > 0


def validate_numeric_input(input_str: str) -> bool:
    """
    Validate if input string is a numeric value
    """
    try:
        int(input_str)
        return True
    except ValueError:
        return False


def format_task_status(is_completed: bool) -> str:
    """
    Format task status for display
    """
    return "✓ Completed" if is_completed else "○ Incomplete"


def is_empty_or_whitespace(text: str) -> bool:
    """
    Check if text is empty or contains only whitespace
    """
    return not text or text.strip() == ""
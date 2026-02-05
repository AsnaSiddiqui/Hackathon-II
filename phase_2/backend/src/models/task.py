from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional, List, Union, Dict
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Boolean, Text, func
from enum import Enum
from pydantic import BaseModel
import json

if TYPE_CHECKING:
    from models.user import User

class TaskPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, sa_column=Column("description", Text))
    completed: bool = Field(default=False)
    priority: TaskPriority = Field(default=TaskPriority.medium)
    due_date: Optional[datetime] = Field(default=None)
    category: Optional[str] = Field(default=None, max_length=100)
    # Store tags as JSON string since SQLModel doesn't support direct JSON arrays
    tags: Optional[str] = Field(default="[]", sa_column=Column("tags", String))  # JSON string representation
    # Store notification_settings as JSON string
    notification_settings: Optional[str] = Field(default="{}", sa_column=Column("notification_settings", String))  # JSON string representation

class Task(TaskBase, table=True):
    __tablename__ = "task"
    __table_args__ = {"extend_existing": True}

    id: int = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id", nullable=False)  # Using string for user ID from Better Auth
    created_at: datetime = Field(sa_column=Column("created_at", DateTime(timezone=True), default=func.now()))
    updated_at: datetime = Field(sa_column=Column("updated_at", DateTime(timezone=True), default=func.now(), onupdate=func.now()))

    # Relationship to user
    user: "User" = Relationship(back_populates="tasks")

from typing import Union

# Redefine TaskRead to align with runtime data (deserialized JSON)
class TaskRead(TaskBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime
    # Runtime objects are deserialized from JSON strings
    tags: List[str]  # Runtime object will be a list of strings (deserialized from JSON string)
    notification_settings: Dict[str, object]  # Runtime object will be a dict (deserialized from JSON string)

class TaskCreate(TaskBase):
    # Don't include user_id in creation schema - it will be set from authenticated user
    # created_at and updated_at are set automatically by the database
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[TaskPriority] = None
    due_date: Optional[datetime] = None
    category: Optional[str] = None
    tags: Optional[str] = None  # JSON string representation
    notification_settings: Optional[str] = None  # JSON string representation
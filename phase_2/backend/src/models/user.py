from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional, List
import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Boolean

if TYPE_CHECKING:
    from models.task import Task

class UserBase(SQLModel):
    name: str = Field(sa_column=Column("name", String, nullable=False))
    email: str = Field(sa_column=Column("email", String, unique=True, nullable=False))
    email_verified: bool = Field(sa_column=Column("emailVerified", Boolean), default=False)
    image: Optional[str] = Field(sa_column=Column("image", String), default=None)
    created_at: datetime = Field(sa_column=Column("createdAt", DateTime(timezone=True), nullable=False))
    updated_at: datetime = Field(sa_column=Column("updatedAt", DateTime(timezone=True), nullable=False))

class User(UserBase, table=True):
    __tablename__ = "user"  # Explicitly set table name to "user"
    __table_args__ = {"extend_existing": True}

    id: str = Field(sa_column=Column("id", String, primary_key=True))

    # Relationship to tasks (application-specific table)
    tasks: List["Task"] = Relationship(back_populates="user")

class UserRead(UserBase):
    id: str

from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlmodel import Session
from typing import List, Optional
from database import get_session
from models.task import Task, TaskCreate, TaskRead, TaskUpdate
from models.user import User
from services.task import TaskService
from services.better_auth_integration import get_current_user_via_better_auth
from typing import Annotated

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskRead])
def get_user_tasks(
    request: Request,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    completed: Optional[bool] = Query(None),
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    return task_service.get_tasks_by_user(
        current_user.id, limit, offset, completed
    )


@router.post("/", response_model=TaskRead)
def create_task(
    request: Request,
    task_create: TaskCreate,
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    return task_service.create_task(task_create, current_user.id)


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    request: Request,
    task_id: str,
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    task = task_service.get_task_by_id(task_id, current_user.id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    request: Request,
    task_id: str,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    task = task_service.update_task(
        task_id, task_update, current_user.id
    )

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.delete("/{task_id}")
def delete_task(
    request: Request,
    task_id: str,
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    success = task_service.delete_task(task_id, current_user.id)

    if not success:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}


@router.patch("/{task_id}/toggle-complete", response_model=TaskRead)
def toggle_task_completion(
    request: Request,
    task_id: str,
    current_user: User = Depends(get_current_user_via_better_auth),
    session: Session = Depends(get_session)
):
    task_service = TaskService(session)
    task = task_service.toggle_task_completion(
        task_id, current_user.id
    )

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

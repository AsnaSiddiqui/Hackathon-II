---
id: 4
title: Create Tasks
stage: tasks
date: 2026-01-01
surface: agent
model: Claude Sonnet 4.5
feature: 1-console-todo
branch: 1-console-todo
user: user
command: /sp.tasks
labels: [tasks, spec, todo, python, console]
links:
  spec: specs/1-console-todo/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-console-todo/tasks.md
tests:
---
## Prompt

In-Memory Console-Based ToDo Application

Task Group 1: Project Setup
- Create Python project root directory
- Initialize proper folder structure:
  - main.py
  - todo/
    - __init__.py
    - models.py
    - storage.py
    - service.py
    - ui.py
- Ensure project runs without errors before feature implementation

Task Group 2: Data Model
- Define Task data model in models.py
- Include fields:
  - id (int)
  - title (str)
  - description (str, optional)
  - is_completed (bool)
- Ensure Task representation is readable when printed

Task Group 3: In-Memory Storage
- Implement in-memory storage in storage.py
- Choose appropriate data structure (list or dictionary)
- Implement:
  - Add task to storage
  - Retrieve all tasks
  - Find task by ID
  - Delete task by ID
- Implement auto-increment ID generation
- Ensure storage resets on program exit

Task Group 4: Service Layer (Business Logic)
- Implement core task operations in service.py:
  - add_task()
  - get_all_tasks()
  - update_task()
  - delete_task()
  - mark_task_complete()
- Validate task existence before update/delete/complete
- Keep business logic independent of console input/output

Task Group 5: Console UI
- Implement menu display in ui.py
- Show clear options:
  1. Add Task
  2. View Tasks
  3. Update Task
  4. Delete Task
  5. Mark Task as Complete
  6. Exit
- Implement user input handling
- Validate numeric inputs
- Display user-friendly messages

Task Group 6: Application Flow
- Implement main menu loop in main.py
- Route user choices to appropriate service functions via UI layer
- Ensure application continues until user chooses exit
- Handle invalid menu choices gracefully

Task Group 7: Error Handling & Validation
- Handle non-numeric inputs safely
- Handle invalid task IDs
- Prevent application crashes
- Display meaningful error messages

Task Group 8: Manual Testing
- Test Add Task with valid and invalid inputs
- Test View Tasks with empty and populated storage
- Test Update Task with valid and invalid IDs
- Test Delete Task with confirmation
- Test Mark Task as Complete
- Verify in-memory behavior (no persistence)

Task Group 9:

## Response snapshot

Created a comprehensive task list (tasks.md) for the In-Memory Console-Based ToDo Application with 50 specific, actionable tasks organized across 10 phases:

Phase 1: Setup (T001-T008) - Project initialization and basic structure
Phase 2: Foundational (T009-T013) - Core infrastructure (Task model, storage, service, UI, utils)
Phase 3: User Story 1 - Add New Task (T014-T018) - P1 priority feature
Phase 4: User Story 2 - View All Tasks (T019-T023) - P1 priority feature
Phase 5: User Story 3 - Mark Task as Complete (T024-T028) - P2 priority feature
Phase 6: User Story 4 - Update Task Description (T029-T033) - P2 priority feature
Phase 7: User Story 5 - Delete Task (T034-T038) - P3 priority feature
Phase 8: Error Handling & Validation (T039-T043) - Cross-cutting concerns
Phase 9: Application Flow & Menu (T044-T047) - Integration of all features
Phase 10: Polish & Cross-Cutting (T048-T052) - Final touches and validation

Each task follows the required format with ID, story labels, and file paths. Tasks are organized by user story to enable independent implementation and testing. The structure supports both sequential and parallel development approaches with clear dependencies and checkpoints.

## Outcome

- ✅ Impact: Created complete task breakdown with 50 specific tasks across 10 phases
- 🧪 Tests: No automated tests included (manual testing per spec)
- 📁 Files: Created tasks.md in specs/1-console-todo/
- 🔁 Next prompts: Ready for implementation using the task list
- 🧠 Reflection: Tasks are well-organized by user story and priority for efficient development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation with Phase 1 tasks
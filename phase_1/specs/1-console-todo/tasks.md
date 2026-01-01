---
description: "Task list template for feature implementation"
---

# Tasks: In-Memory Console-Based ToDo Application

**Input**: Design documents from `/specs/1-console-todo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `main.py`, `todo/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are generated based on the feature specification
  and design documents.

  Tasks are organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan
- [X] T002 [P] Create main.py application entry point
- [X] T003 [P] Create todo/ package directory with __init__.py
- [X] T004 [P] Create models.py in todo/ package
- [X] T005 [P] Create storage.py in todo/ package
- [X] T006 [P] Create service.py in todo/ package
- [X] T007 [P] Create ui.py in todo/ package
- [X] T008 [P] Create utils.py in todo/ package

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Define Task data model in todo/models.py with id, description (max 256 chars), is_completed
- [X] T010 Implement in-memory storage in todo/storage.py with list/dict structure and auto-increment ID
- [X] T011 Implement basic service functions in todo/service.py (add_task, get_all_tasks)
- [X] T012 Implement basic UI functions in todo/ui.py (display menu, get user input)
- [X] T013 Implement input validation helpers in todo/utils.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add New Task (Priority: P1) 🎯 MVP

**Goal**: Allow users to add new tasks to their to-do list

**Independent Test**: Can be fully tested by starting the application, selecting "Add Task", entering a task description, and verifying the task appears in the list.

### Implementation for User Story 1

- [X] T014 [P] [US1] Implement add_task function in todo/service.py with validation for max 256 chars
- [X] T015 [P] [US1] Implement add task UI flow in todo/ui.py with input validation
- [X] T016 [US1] Update main.py to handle "Add Task" menu option and route to service layer
- [X] T017 [US1] Test add task functionality with valid input in console interface
- [X] T018 [US1] Test add task functionality with invalid input (empty, too long) in console interface

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View All Tasks (Priority: P1)

**Goal**: Allow users to see all their tasks at once with completion status

**Independent Test**: Can be fully tested by adding multiple tasks, then selecting "View Tasks" and verifying all tasks are displayed with correct completion status.

### Implementation for User Story 2

- [X] T019 [P] [US2] Enhance get_all_tasks function in todo/service.py to return all tasks with status
- [X] T020 [P] [US2] Implement view tasks UI display in todo/ui.py with proper formatting
- [X] T021 [US2] Update main.py to handle "View Tasks" menu option and route to service layer
- [X] T022 [US2] Test view tasks functionality with empty task list
- [X] T023 [US2] Test view tasks functionality with populated task list

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mark Task as Complete (Priority: P2)

**Goal**: Allow users to mark tasks as complete after finishing them

**Independent Test**: Can be fully tested by adding a task, viewing the list, selecting the task to mark as complete, and verifying its status changes to completed.

### Implementation for User Story 3

- [X] T024 [P] [US3] Implement mark_task_complete function in todo/service.py with task validation
- [X] T025 [P] [US3] Implement mark task complete UI flow in todo/ui.py with task ID selection
- [X] T026 [US3] Update main.py to handle "Mark Task Complete" menu option and route to service layer
- [X] T027 [US3] Test mark task complete functionality with valid task ID
- [X] T028 [US3] Test mark task complete functionality with invalid task ID

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Update Task Description (Priority: P2)

**Goal**: Allow users to modify the description of an existing task

**Independent Test**: Can be fully tested by adding a task, updating its description, and verifying the change persists when viewing the task list.

### Implementation for User Story 4

- [X] T029 [P] [US4] Implement update_task_description function in todo/service.py with validation
- [X] T030 [P] [US4] Implement update task UI flow in todo/ui.py with task ID and new description input
- [X] T031 [US4] Update main.py to handle "Update Task" menu option and route to service layer
- [X] T032 [US4] Test update task functionality with valid inputs
- [X] T033 [US4] Test update task functionality with invalid inputs (empty, too long, invalid ID)

**Checkpoint**: At this point, User Stories 1, 2, 3 AND 4 should all work independently

---

## Phase 7: User Story 5 - Delete Task (Priority: P3)

**Goal**: Allow users to remove tasks that are no longer needed

**Independent Test**: Can be fully tested by adding tasks, deleting one, and verifying it no longer appears in the task list.

### Implementation for User Story 5

- [X] T034 [P] [US5] Implement delete_task function in todo/service.py with task validation
- [X] T035 [P] [US5] Implement delete task UI flow in todo/ui.py with task ID selection and confirmation
- [X] T036 [US5] Update main.py to handle "Delete Task" menu option and route to service layer
- [X] T037 [US5] Test delete task functionality with valid task ID
- [X] T038 [US5] Test delete task functionality with invalid task ID

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Error Handling & Validation (Cross-Cutting)

**Purpose**: Implement comprehensive error handling across all features

- [X] T039 Implement error handling for empty task list operations in todo/service.py
- [X] T040 Implement input validation for all numeric inputs in todo/utils.py
- [X] T041 Add proper error messages for invalid inputs in todo/ui.py
- [X] T042 Handle invalid menu choices gracefully in main.py
- [X] T043 Test error handling for all edge cases identified in spec

---

## Phase 9: Application Flow & Menu (Integration)

**Purpose**: Complete the main application loop and menu navigation

- [X] T044 Implement complete menu loop in main.py with all 6 options
- [X] T045 Add "Exit" functionality to main.py that terminates the application
- [X] T046 Test complete application flow with all menu options
- [X] T047 Verify in-memory behavior (data lost on exit) as specified

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T048 [P] Documentation updates in quickstart.md
- [X] T049 Code cleanup and refactoring following PEP 8 guidelines
- [X] T050 [P] Run quickstart.md validation to ensure instructions work correctly
- [X] T051 Final integration testing of all features together
- [X] T052 Verify all success criteria from spec are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Error Handling (Phase 8)**: Depends on basic user story implementations
- **Application Flow (Phase 9)**: Depends on all user story implementations
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services (T009 before T014, T019, etc.)
- Services before UI components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
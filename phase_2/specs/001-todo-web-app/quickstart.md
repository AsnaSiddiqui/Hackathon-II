# Quick Start Guide: Todo Full-Stack Web Application

## Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- uv (Python package manager)
- PostgreSQL (or Neon Serverless PostgreSQL account)
- Git

## Setup Instructions

### 1. Clone and Initialize the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup
```bash
cd backend
uv venv  # Create virtual environment
source .venv/bin/activate  # Activate virtual environment (Linux/Mac) or .venv\Scripts\activate (Windows)
uv pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration
Create `.env` files in both backend and frontend directories:

**Backend (.env):**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret
NEON_DATABASE_URL=your-neon-db-url
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_AUTH_URL=http://localhost:8000/auth
```

### 5. Database Setup
```bash
cd backend
source .venv/bin/activate
alembic upgrade head  # Run database migrations
```

### 6. Run Applications

**Backend:**
```bash
cd backend
source .venv/bin/activate
uv run python -m src.main  # or uv run fastapi dev src/main.py
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Key Endpoints

### Backend (FastAPI)
- API Root: `http://localhost:8000`
- Task API: `http://localhost:8000/api/users/{user_id}/tasks`
- Swagger UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`

### Frontend (Next.js)
- Application: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`

## Testing

### Backend Tests
```bash
cd backend
source .venv/bin/activate
pytest  # Run all tests
pytest tests/unit/  # Run unit tests only
pytest tests/integration/  # Run integration tests only
```

### Frontend Tests
```bash
cd frontend
npm test  # Run unit tests
npm run test:e2e  # Run end-to-end tests
```

## Development Workflow

1. **Start Backend**: Ensure the backend is running with `uv run fastapi dev src/main.py`
2. **Start Frontend**: Run the frontend with `npm run dev`
3. **Access Application**: Navigate to `http://localhost:3000`
4. **API Documentation**: Visit `http://localhost:8000/docs` for API documentation
5. **Testing**: Run tests frequently using the commands above

## Troubleshooting

### Common Issues
- **Database Connection**: Ensure PostgreSQL is running and credentials are correct
- **Port Conflicts**: Check if ports 8000 (backend) and 3000 (frontend) are available
- **Dependency Issues**: Run `pip install -r requirements.txt` and `npm install` again

### Authentication
- Register a new user through the frontend or API
- Obtain JWT token from authentication endpoint
- Use token in Authorization header as `Bearer <token>` for protected endpoints
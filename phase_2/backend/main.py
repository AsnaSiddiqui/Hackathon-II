from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import tasks
from src.core.config import settings
from src.database import create_db_and_tables

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

origins = [
    "https://hackathon-ii-kappa.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

@app.on_event("startup")
def on_startup():
    """Initialize database schema on application startup."""
    create_db_and_tables()

# Include API routes
app.include_router(tasks.router, tags=["tasks"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)
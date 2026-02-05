from sqlmodel import create_engine, Session, SQLModel
from core.config import settings
import os
from dotenv import load_dotenv



load_dotenv()

# Create the database engine - ONLY from DATABASE_URL environment variable
connection_string = os.getenv("DATABASE_URL")
if not connection_string:
    raise ValueError("DATABASE_URL environment variable is required")

engine = create_engine(
    connection_string,
    pool_pre_ping=True,
    echo=True,  # Set to False in production
)

def create_db_and_tables():
    """Apply application-specific schema at startup, leaving auth tables intact."""
    from sqlalchemy import text
    import logging

    # Read and execute schema.sql to create application tables only
    schema_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'schema.sql')
    if os.path.exists(schema_file_path):
        with open(schema_file_path, 'r', encoding='utf-8') as file:
            schema_sql = file.read()

        with engine.connect() as connection:
            # Execute the schema in a transaction
            with connection.begin():
                connection.execute(text(schema_sql))
        logging.info("Application database schema applied successfully")
    else:
        # Fallback: create only the task table using SQLModel metadata
        SQLModel.metadata.create_all(engine)
        logging.info("Application database schema created using SQLModel metadata")

def get_session():
    """Get database session"""
    with Session(engine) as session:
        yield session
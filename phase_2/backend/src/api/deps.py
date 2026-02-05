from sqlmodel import Session
from database import get_session

# Re-export the get_session from the database module
get_session = get_session
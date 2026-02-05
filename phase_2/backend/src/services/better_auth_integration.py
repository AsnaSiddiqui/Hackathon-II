from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session
from models.user import User
from database import get_session
import os
import jwt
from jwt import PyJWKClient
from typing import Optional


# Initialize the security scheme for JWT token validation
security = HTTPBearer()


def get_jwt_user_id(token: str) -> dict:
    """
    Verify the JWT token locally using JWKS and extract user information.
    """
    # According to the requirements, use the fixed JWKS URL
    jwks_url = "https://hackathon-ii-phase-ll.vercel.app/api/auth/jwks"

    # Use PyJWKClient to fetch the signing key
    jwks_client = PyJWKClient(jwks_url)

    try:
        # Decode the JWT token
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        # Decode and verify the token according to the specified algorithm
        # As per requirements: Algorithm: EdDSA, Issuer: http://localhost:3000, Audience: http://localhost:3000
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["EdDSA"],  # Use EdDSA as specified in requirements
            issuer="https://hackathon-ii-phase-ll.vercel.app",
            audience="https://hackathon-ii-phase-ll.vercel.app",
            options={"verify_exp": True}  # Verify expiration
        )

        # Extract user info from token payload as per requirements:
        # user_id = payload["id"] OR payload["sub"]
        # email = payload.get("email")
        user_id = payload.get("id") or payload.get("sub")
        email = payload.get("email")

        return {
            "user_id": user_id,
            "email": email,
            "payload": payload
        }

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    except Exception as e:
        print(f"JWT validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token validation failed"
        )


async def get_current_user_via_better_auth(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
):
    """
    Validate the current user using Better Auth - verify JWT token locally.
    Accepts requests authenticated via JWT issued by Better Auth.
    """
    # Check if credentials exist
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No authentication token found",
        )

    token = credentials.credentials

    # Verify the JWT token locally using the defined function
    user_info = get_jwt_user_id(token)
    user_id = user_info["user_id"]
    email = user_info["email"]

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token data - no user ID found",
        )

    # Get user from database
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
             detail="User not found", )

    return user
from fastapi import FastAPI
from typing import Optional
from .booksApp.routes import book_route
from contextlib import asynccontextmanager
from src.db.main import db_init


@asynccontextmanager
async def life_span(app: FastAPI):
    print("server has been started...")
    await db_init()
    yield
    print("server has been stopped...")


version = 1
app = FastAPI(title="bookStore", version=version, lifespan=life_span)

app.include_router(book_route, prefix=f"/api/v{version}/books")


@app.get("/")
async def home():
    return {"health": "OK"}


@app.get("/names/{name}")
async def get_name(name: str, place: Optional[str] = None):
    return {"name": name, place: place}

from pydantic import BaseModel
from datetime import datetime


class Book(BaseModel):
    id: int
    name: str
    author: str
    publisher: str
    published_date: str
    published_year: str
    rating: float
    price: float
    stock: bool
    page_count: int
    language: str
    created_at: datetime
    updated_at: datetime


class BookCreate(BaseModel):
    name: str
    author: str
    publisher: str
    published_date: str
    published_year: str
    rating: float
    price: float
    stock: bool
    page_count: int
    language: str


class BookUpdate(BaseModel):
    name: str = None
    author: str = None
    price: float = None
    page_count: int = None
    stock: bool = None

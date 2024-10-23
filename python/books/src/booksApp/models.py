from datetime import datetime
from sqlmodel import SQLModel, Field, Column
from sqlalchemy import Column
import sqlalchemy.dialects.postgresql as pg


class BookModel(SQLModel, table=True):
    __tablename__ = "books"
    id: int = Field(primary_key=True)
    name: str
    author: str
    publisher: str
    published_date: str
    published_year: str
    rating: float = Field(default=0.0)
    price: float = Field(default=0.0)
    stock: bool
    page_count: int = Field(default=0)
    language: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __str__(self):
        return f"<Book <{self.name}>>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "publisher": self.publisher,
            "published_date": self.published_date,
            "published_year": self.published_year,
            "rating": self.rating,
            "price": self.price,
            "stock": self.stock,
            "page_count": self.page_count,
            "language": self.language,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

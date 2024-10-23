from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from .dto import Book, BookCreate, BookUpdate
from .models import BookModel
from .error import Error
from typing import List
from fastapi import status
from datetime import datetime


class BookService:
    async def get_all_books(self, session: AsyncSession) -> List[BookModel]:
        statement = select(BookModel).order_by(desc(BookModel.created_at))
        result = await session.execute(statement)
        return result.scalars().all()

    async def get_book(self, session: AsyncSession, id: int) -> BookModel | None:
        statement = select(BookModel).where(BookModel.id == id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_book_write_access(
        self, session: AsyncSession, id: int
    ) -> BookModel | None:
        statement = select(BookModel).where(BookModel.id == id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def create_book(self, session: AsyncSession, data: BookCreate) -> BookModel:
        book_data = data.model_dump()
        new_book = BookModel(**book_data)
        session.add(new_book)
        await session.commit()

        return new_book

    async def update_book(self, session: AsyncSession, id: int, data: BookUpdate):
        book_data = data.model_dump()
        book_to_update = await self.get_book_write_access(session, id)
        if book_to_update is None:
            raise Error(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="book not found",
            )
        for k, v in book_data.items():
            if v is not None:
                if hasattr(book_to_update, k):
                    setattr(book_to_update, k, v)
        session.merge(book_to_update)
        await session.commit()

        return book_to_update

    async def delete_book(self, session: AsyncSession, id: int):
        book = await self.get_book_write_access(session, id)
        print(book)
        if book is not None:
            await session.delete(book)
            await session.commit()
            return book
        raise Exception("book not found")

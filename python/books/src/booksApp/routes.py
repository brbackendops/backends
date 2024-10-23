from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.responses import JSONResponse
from .dto import BookUpdate, Book, BookCreate
from .service import BookService
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from typing import List
from .models import BookModel
from .error import Error

book_route = APIRouter()
book_service = BookService()


@book_route.get("/", status_code=status.HTTP_200_OK)
async def get_books(session: AsyncSession = Depends(get_session)):
    try:
        books = await book_service.get_all_books(session)
        print(books)
        books = [book.to_dict() for book in books]
        return {"status": "success", "data": books}
    except Exception as err:
        print(err)
        return Error(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=err)


@book_route.get("/{book_id}", status_code=status.HTTP_200_OK)
async def get_book(book_id: int, session: AsyncSession = Depends(get_session)):
    try:
        book = await book_service.get_book(session, book_id)
        print("book", book)
        if book is not None:
            return {"status": "success", "data": book}
        return {"status": "success", "data": []}
    except Exception as err:
        print(err)
        return Error(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=err)


@book_route.put(
    "/{id}",
    status_code=status.HTTP_200_OK,
)
async def update_book(
    id: int, data: BookUpdate, session: AsyncSession = Depends(get_session)
):
    try:
        latest_book_data = await book_service.update_book(session, id, data)
        return {"status": "success", "data": latest_book_data}
    except Exception as err:
        print(err)
        raise Error(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=err)


@book_route.post("/create", status_code=status.HTTP_201_CREATED)
async def create_book(data: BookCreate, session: AsyncSession = Depends(get_session)):
    try:
        new_book = await book_service.create_book(session, data)
        return {"status": "success", "data": new_book}
    except Exception as err:
        print(err)
        return {"status": "failed", "error": err}


@book_route.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_book(id: int, session: AsyncSession = Depends(get_session)):
    try:
        print(id)
        latest_book_data = await book_service.delete_book(session, id)
        print(latest_book_data)
        return {"status": "success", "data": latest_book_data}
    except Exception as err:
        print(err)
        return {"status": "failed", "error": err}

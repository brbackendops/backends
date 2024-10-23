from sqlmodel import create_engine, SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.ext.asyncio.session import AsyncSession
from src.config import Config
from sqlalchemy.orm import sessionmaker

engine = create_async_engine(url=Config.DATABASE_URL, echo=True)


async def db_init():
    async with engine.begin() as conn:
        from src.booksApp.models import BookModel

        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncEngine:
    Session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    async with Session() as session:
        yield session

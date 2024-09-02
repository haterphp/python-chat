
# Make QTWindow
from typing import Union

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from database import Base, SessionLocal, engine

from server.ServerRouter import ServerRouter

Base.metadata.create_all(bind=engine)

# TODO: Нужно как-то добавить зависимость в fastapi
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

app.mount("/static", StaticFiles(directory="view/build/static"), name="static")

if __name__ == "main":
	serverRouter = ServerRouter()

	app.include_router(router=serverRouter.router)
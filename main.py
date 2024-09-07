
# Make QTWindow

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from database import Base, engine

from server.ServerRouter import ServerRouter

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/static", StaticFiles(directory="view/build/static"), name="static")

if __name__ == "main":
	serverRouter = ServerRouter()

	app.include_router(router=serverRouter.router)

# Make QTWindow

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from env import STATIC_ASSETS_PATH, STATIC_ASSETS_ROUTEPATH
from server.database import Base, engine

from server.ServerRouter import ServerRouter

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount(STATIC_ASSETS_ROUTEPATH, StaticFiles(directory=STATIC_ASSETS_PATH), name="static")

if __name__ == "main":
	serverRouter = ServerRouter()

	app.include_router(router=serverRouter.router)
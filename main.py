
# Make QTWindow
from typing import Union

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from server.ServerRouter import ServerRouter

app = FastAPI()
app.mount("/static", StaticFiles(directory="view/build/static"), name="static")

if __name__ == "main":
	serverRouter = ServerRouter()

	app.include_router(router=serverRouter.router)
from typing import List
from fastapi import APIRouter
from fastapi.responses import FileResponse

from env import STATIC_HTML_FILEPATH, API_PREFIX
from server.route_actions import IRouteAction
from server.route_actions.chats import CreateNewMessageAction, GetChatMessagesAction, GetAllChatsAction, CreateNewChatAction

class ServerRouter:

	def __init__(self) -> None:
		self.router = APIRouter()

		# Define routes
		self.__defineRoutes([
			# Chats actions
			GetAllChatsAction(),
			CreateNewChatAction(),
			GetChatMessagesAction(),
			CreateNewMessageAction()
		])

		self.router.add_api_route('{catchall:path}', self.home_endpoint, methods=["GET"])

	# Application routes region
	def home_endpoint(self) -> FileResponse:
		return FileResponse(STATIC_HTML_FILEPATH)

	def __defineRoutes(self, routes: List[IRouteAction]) -> None:
		for route in routes:
			route_path = API_PREFIX.format('/'.join(route.route_path))
			self.router.add_api_route(
				methods=route.route_method,
				path=route_path,
				endpoint=route.action,
				response_model=route.response_model,
				status_code=route.route_status_code
			)
	# endregion

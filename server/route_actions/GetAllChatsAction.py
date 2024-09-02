from typing import List
from fastapi import Request
from fastapi.responses import JSONResponse
from server.route_actions import IRouteAction


class GetAllChatsAction(IRouteAction):

	def router_path(self) -> List[str]:
		return ['chats']

	def action(self, request: Request) -> JSONResponse:
		return JSONResponse(content={ "response": "test message" }, status_code=200)
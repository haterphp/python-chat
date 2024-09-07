from typing import List
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from database import get_db
from server.data.chats import ChatSchema
from server.route_actions import IRouteAction
from sqlalchemy.orm import Session

from server.services import ChatService

class GetAllChatsAction(IRouteAction):

	def route_path(self) -> List[str]:
		return ['chats']

	def	route_method(self) -> List[str]:
		return ["GET"]

	def response_model(self):
		return list[ChatSchema]

	def action(self, db: Session = Depends(get_db)) -> JSONResponse:
		chat_service = ChatService(db)
		return JSONResponse(
			content=chat_service.get_all_chats(),
			status_code=200
		)
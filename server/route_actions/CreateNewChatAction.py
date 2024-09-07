from typing import List

from fastapi.params import Depends
from database import get_db
from sqlalchemy.orm import Session

from fastapi.responses import JSONResponse
from server.data.chats import ChatCreateSchema, ChatSchema
from server.route_actions import IRouteAction
from server.services import ChatService


class CreateNewChatAction(IRouteAction):
	def route_path(self) -> List[str]:
		return ['chats']

	def route_method(self) -> List[str]:
		return ["POST"]

	def response_model(self):
		return ChatSchema

	def action(self, port: ChatCreateSchema, db: Session = Depends(get_db)) -> JSONResponse:
		chat_service = ChatService(db)
		return JSONResponse(content=chat_service.create_chat(port), status_code=201)
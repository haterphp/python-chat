from typing import List

from fastapi.params import Depends
from server.database import get_db
from sqlalchemy.orm import Session

from fastapi.responses import JSONResponse
from server.components.chats import CreateChatSchema, ChatSchema
from server.route_actions import IRouteAction
from server.services import ChatService


class CreateNewChatAction(IRouteAction):
	@property
	def route_path(self) -> List[str]:
		return ['chats']

	@property
	def route_method(self) -> List[str]:
		return ["POST"]

	@property
	def response_model(self):
		return ChatSchema

	@property
	def route_status_code(self) -> int:
		return 201

	def action(self, port: CreateChatSchema, db: Session = Depends(get_db)):
		chat_service = ChatService(db)
		return chat_service.create_chat(port)
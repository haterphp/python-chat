from typing import List

from fastapi.params import Depends
from server.database import get_db
from sqlalchemy.orm import Session

from server.components.chats import ChatService, ChatMessageSchema, CreateChatMessageSchema
from server.route_actions import IRouteAction


class CreateNewMessageAction(IRouteAction):
	@property
	def route_path(self) -> List[str]:
		return ['chats', '{chat_id}', 'message']

	@property
	def route_method(self) -> List[str]:
		return ["POST"]

	@property
	def response_model(self):
		return ChatMessageSchema

	@property
	def route_status_code(self) -> int:
		return 201

	def action(self, chat_id: int, port: CreateChatMessageSchema, db: Session = Depends(get_db)):
		chat_service = ChatService(db)
		return chat_service.create_chat_message(port, chat_id)
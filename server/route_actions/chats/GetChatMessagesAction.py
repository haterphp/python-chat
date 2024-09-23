from typing import List
from fastapi.params import Depends
from server.database import get_db
from server.components.chats import ChatService, ChatMessageSchema
from server.route_actions import IRouteAction
from sqlalchemy.orm import Session


class GetChatMessagesAction(IRouteAction):

	@property
	def route_path(self) -> List[str]:
		return ['chats', '{chat_id}']

	@property
	def	route_method(self) -> List[str]:
		return ["GET"]

	@property
	def response_model(self):
		return List[ChatMessageSchema]

	def action(self, chat_id:int, db: Session = Depends(get_db)):
		chat_service = ChatService(db)
		return chat_service.get_chat_messages(chat_id)
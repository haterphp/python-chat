from typing import List
from fastapi.params import Depends
from server.database import get_db
from server.components.chats import ChatSchema, ChatService
from server.route_actions import IRouteAction
from sqlalchemy.orm import Session


class GetAllChatsAction(IRouteAction):

	@property
	def route_path(self) -> List[str]:
		return ['chats']

	@property
	def	route_method(self) -> List[str]:
		return ["GET"]

	@property
	def response_model(self):
		return List[ChatSchema]

	def action(self, db: Session = Depends(get_db)):
		chat_service = ChatService(db)
		return chat_service.get_all_chats()
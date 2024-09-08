from sqlalchemy.orm import Session

from server.components.chats import ChatModel, CreateChatSchema

class ChatService():
	def __init__(self, db: Session) -> None:
		self.__db = db

	def get_all_chats(self) -> list[ChatModel]:
		return self.__db.query(ChatModel).all()

	def create_chat(self, port: CreateChatSchema) -> ChatModel:
		chat = ChatModel(name=port.name)

		self.__db.add(chat)
		self.__db.commit()
		self.__db.refresh(chat)

		return chat
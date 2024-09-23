from sqlalchemy.orm import Session

from server.components.chats import ChatMessageModel, ChatModel, CreateChatSchema, CreateChatMessageSchema

class ChatService():
	def __init__(self, db: Session) -> None:
		self.__db = db

	def get_all_chats(self) -> list[ChatModel]:
		return self.__db.query(ChatModel).all()

	def create_chat(self, port: CreateChatSchema) -> ChatModel:
		chat = ChatModel(name=port.name)
		self.__commit(chat)
		return chat

	def get_chat_messages(self, chat_id: int) -> list[ChatMessageModel]:
		chat_model = self.__get_chat_by_id(chat_id)
		# Add handling for assertion
		assert chat_model is not None
		return chat_model.messages

	def create_chat_message(self, port: CreateChatMessageSchema, chat_id: int) -> ChatMessageModel:
		chat_message_model = ChatMessageModel(message=port.message, chat_id=chat_id)
		self.__commit(chat_message_model)
		return chat_message_model

	def __get_chat_by_id(self, chat_id: int) -> ChatModel:
		return self.__db.query(ChatModel).filter(ChatModel.id == chat_id).first()

	def __commit(self, entity):
		self.__db.add(entity)
		self.__db.commit()
		self.__db.refresh(entity)
from sqlalchemy import Column, Integer, String, ForeignKey
from server.database import Base
from sqlalchemy.orm import mapped_column


class ChatMessageModel(Base):
	__tablename__ = "chat_messages"

	id = Column(Integer, primary_key=True)
	message = Column(String)
	chat_id = mapped_column(ForeignKey("chats.id"))
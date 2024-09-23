from sqlalchemy import Column, Integer, String
from server.database import Base
from sqlalchemy.orm import relationship


class ChatModel(Base):
	__tablename__ = "chats"

	id = Column(Integer, primary_key=True)
	name = Column(String)
	messages = relationship("ChatMessageModel")

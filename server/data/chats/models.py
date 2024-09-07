from sqlalchemy import Column, Integer, String
from database import Base


class ChatModel(Base):
	__tablename__ = "chats"

	id = Column(Integer, primary_key=True)
	name = Column(String)
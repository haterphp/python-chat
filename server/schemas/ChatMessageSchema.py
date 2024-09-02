
from dataclasses import dataclass

from server.schemas import User


@dataclass
class ChatMessageSchema:
	id:int
	content:str
	author: User
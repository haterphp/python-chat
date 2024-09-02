
from dataclasses import dataclass

from server.data_classes import User


@dataclass
class ChatMessage:
	id:int
	content:str
	author: User
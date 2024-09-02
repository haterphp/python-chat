from dataclasses import dataclass, field
from datetime import date
from typing import List

from server.schemas import User


@dataclass
class ChatSchema:
	id:int
	users: List[User] = field(default_factory=list) # type: ignore
	created_at: date
from dataclasses import dataclass, field
from datetime import date
from typing import List

from server.data_classes import User


@dataclass
class Chat:
	id:int
	users: List[User] = field(default_factory=list) # type: ignore
	created_at: date
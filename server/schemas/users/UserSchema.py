from dataclasses import dataclass

from server.schemas.users import CreateUserSchema


@dataclass
class User(CreateUserSchema):
	id: int

	class Config:
		orm_mode = True
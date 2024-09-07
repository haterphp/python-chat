from pydantic import BaseModel

class ChatSchema(BaseModel):
	id: int
	name: str

	class Config:
		orm_mode = True

class ChatCreateSchema(BaseModel):
	name: str
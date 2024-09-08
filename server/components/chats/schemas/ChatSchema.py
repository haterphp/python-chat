from pydantic import BaseModel

class ChatSchema(BaseModel):
	id: int
	name: str

	class Config:
		orm_mode = True
		from_attributes = True
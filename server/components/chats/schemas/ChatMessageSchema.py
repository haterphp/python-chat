from pydantic import BaseModel

class ChatMessageSchema(BaseModel):
	id: int
	message: str

	class Config:
		orm_mode = True
		from_attributes = True
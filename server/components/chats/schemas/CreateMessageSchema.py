from pydantic import BaseModel

class CreateChatMessageSchema(BaseModel):
	message: str
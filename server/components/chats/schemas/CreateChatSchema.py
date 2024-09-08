from pydantic import BaseModel

class CreateChatSchema(BaseModel):
	name: str
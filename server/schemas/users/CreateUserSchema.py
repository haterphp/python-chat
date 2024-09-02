from dataclasses import dataclass


@dataclass
class CreateUserSchema:
	username: str
	password: str